import { videoJs } from '../videojs';
import { SeekOptions } from './types';

const Plugin = videoJs.getPlugin('plugin');

export class SeekButtonPlugin extends Plugin {
  constructor(player: ReturnType<typeof videoJs.player>, options: SeekOptions) {
    super(player, options);
    player.on('ready', () => {
      this.onPlayerReady(player, this.getOptions(options));
    });
  }

  onPlayerReady(player: ReturnType<typeof videoJs.player>, options: SeekOptions) {
    if (options.forward && options.forward > 0) {
      player.controlBar.seekForward = player.controlBar.addChild('SeekButtonComponent', {
        forward: options.forward,
        fwdBtnTooltip: options.fwdBtnTooltip
      }, options.fwdBtnPosition);
    }
  
    if (options.backward && options.backward > 0) {
      player.controlBar.seekBackward = player.controlBar.addChild('SeekButtonComponent', {
        backward: options.backward,
        bwdBtnTooltip: options.bwdBtnTooltip
      }, options.bwdBtnPosition);
    }
  }
  getOptions(options: SeekOptions) {
    const defaultDurations = {
      forward: 10,
      backward: 10
    };
    const defaultPositions = {
      fwdBtnPosition: 1,
      bwdBtnPosition: 0
    };
    const mergedOptions = videoJs.mergeOptions(defaultDurations, defaultPositions, options);
    const tooltips = {
      fwdBtnTooltip: `Forward ${mergedOptions.forward} seconds`,
      bwdBtnTooltip: `Replay ${mergedOptions.backward} seconds`
    };
    return videoJs.mergeOptions(tooltips, mergedOptions);
  }
}