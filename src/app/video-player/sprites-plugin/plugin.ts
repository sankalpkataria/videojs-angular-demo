import { videoJs } from '../videojs';
import { SpriteOptions } from './types';

const Plugin = videoJs.getPlugin('plugin');
interface SpriteCanvasOptions {
  context: any
  image: HTMLImageElement;
  width: number;
  height: number;
  frameIndex: number;
  numberOfFrames: number;
}

interface SpriteCanvasMethods extends SpriteCanvasOptions {
  update: Function;
  render: Function;
}

export class SpritesPlugin extends Plugin {
  constructor(player: ReturnType<typeof videoJs.player>, options: SpriteOptions) {
    super(player, options);
    player.on('ready', () => {
      if (!options.spritesUrl) {
        throw new Error('Must provide Sprites Url');
      }
      this.onPlayerReady(player, options);
    });
  }
  onPlayerReady(player: ReturnType<typeof videoJs.player>, options: SpriteOptions) {
    const sprites = player.addChild('SpritesComponent', options);
    const canvas = sprites.el_;
    const thumbnail = new Image();
    let theSpriteItems: any;
    thumbnail.onerror = (err) => {
      this.handleError(err, canvas);
    };
    thumbnail.src = options.spritesUrl;
    thumbnail.onload = () => {
      theSpriteItems = this.onThumbnailLoad(thumbnail, canvas);
    }
    player.controlBar.progressControl.on('mousemove', (e: any) => {
      canvas.style.left = `${e.pageX - 80}px`;
      let newTime = player.controlBar.progressControl.seekBar.calculateDistance(e) * player.duration()
      if (newTime === player.duration()) {
        newTime = newTime - 0.1;
      }
      var seekTime = this.roundTo(newTime, 30);
      let nowFrame = seekTime / 30;
      theSpriteItems.update(nowFrame);
      theSpriteItems.render();
    });
    player.controlBar.progressControl.on('mouseenter', (e: any) => {
      canvas.hidden = false;
    });
    player.controlBar.progressControl.on('mouseleave', (e: any) => {
      canvas.hidden = true;
    });
  }

  roundTo(num: number, roundTo: number) { //https://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
    const mod = num % roundTo;
    if (mod <= (num/2)) { 
        return num - mod;
    } else {
        return num + roundTo - mod;
    }
  }

  handleError(error: string | Event, canvas: HTMLCanvasElement) {
    console.log(error, 'Error');
    canvas.hidden = true;
  }

  onThumbnailLoad(thumbnail: HTMLImageElement, canvas: HTMLCanvasElement) {
    canvas.width = 256;
    canvas.height = 144;
    const numberOfFrames = thumbnail.width / canvas.width;						//number of frames (in sprites file)
    const theSpriteItems = this.getSprites({
      context: canvas.getContext("2d"),
      image: thumbnail,
      numberOfFrames: numberOfFrames || 1,
      width: thumbnail.width,
      height: thumbnail.width,
      frameIndex: 0
    });
      
    theSpriteItems.render();
    return theSpriteItems;
  }

  getSprites(options: SpriteCanvasOptions) {
    let spritesCanvas: SpriteCanvasMethods = Object.assign({}, options, {
      update: (newVal: number) => {
        spritesCanvas.frameIndex = newVal;
      },
      render: () => {}
    });
    spritesCanvas.render = this.drawImageOnCanvas.bind(spritesCanvas)
    return spritesCanvas;
  }

  drawImageOnCanvas() {
    // Clear the canvas between each full animation
    this.context.clearRect(0, 0, this.width, this.height);
    // Draw the new image
    this.context.drawImage(
      this.image,
       this.frameIndex * this.width / this.numberOfFrames,
       0,
       this.width / this.numberOfFrames,
       this.height,
       0,
       0,
       this.width / this.numberOfFrames,
       this.height
    );
  }
}