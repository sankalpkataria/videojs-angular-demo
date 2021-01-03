import { videoJs } from "../videojs";
import { SpriteOptions } from "./types";

export const getSpritesComponent = () => {
  const videoJsComponent = videoJs.getComponent('Component');
  return videoJs.extend(videoJsComponent, {
    constructor: function (player: ReturnType<typeof videoJs.player>, options: SpriteOptions) {
      videoJsComponent.apply(this, arguments);
    },
    createEl: function () {
      return videoJs.dom.createEl('canvas', {
        className: 'vjs-sprites'
      }, {
        id: 'sprites',
        hidden: true
      });
    }
  });
}