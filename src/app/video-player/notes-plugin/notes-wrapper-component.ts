import { videoJs } from "../videojs";

export const getNotesWrapperComponent = () => {
    const videoJsComponent = videoJs.getComponent('Component');
    return videoJs.extend(videoJsComponent, {
      constructor: function () {
        videoJsComponent.apply(this, arguments);
      },
      createEl: function () {
        return videoJs.dom.createEl('div', {
          className: 'vjs-notes-wrapper'
        });
      }
    });
  }