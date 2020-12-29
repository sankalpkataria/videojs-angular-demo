import { videoJs } from "../videojs";

export const getNotesInputComponent = () => {
    const videoJsComponent = videoJs.getComponent('Component');
    return videoJs.extend(videoJsComponent, {
      constructor: function () {
        videoJsComponent.apply(this, arguments);
        this.on('keyup', (event: any) => {
          this.setState({ note: event.target?.value });
        });
      },
      createEl: function () {
        return videoJs.dom.createEl('textarea', {
          className: 'vjs-notes-input'
        }, {
          placeholder: 'Enter note here'
        });
      }
    });
  }