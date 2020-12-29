import { videoJs } from "../videojs";

export const getCurrentTimeComponent = () => {
    const videoJsComponent = videoJs.getComponent('Component');
    return videoJs.extend(videoJsComponent, {
      constructor: function () {
        videoJsComponent.apply(this, arguments);
      },
      createEl: function () {
        return videoJs.dom.createEl('span', {
          className: 'vjs-notes-current-time',
          innerHTML: this.player_.currentTime().toFixed(2)
        });
      }
    });
  }