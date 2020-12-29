import { videoJs } from "../videojs";

export const getNotesSaveBtnComponent = () => {
    const videoJsComponent = videoJs.getComponent('Component');
    return videoJs.extend(videoJsComponent, {
      constructor: function () {
        videoJsComponent.apply(this, arguments);
      },
      createEl: function () {
        return videoJs.dom.createEl('button', {
          className: 'vjs-notes-save-btn',
          innerHTML: 'Save'
        }, {
          role: 'button'
        });
      }
    });
  }