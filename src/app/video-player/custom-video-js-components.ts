import { videoJs } from './videojs';

class CustomVideoJsComponent {
  private static _instance: CustomVideoJsComponent = new CustomVideoJsComponent();
  constructor() {
    if (CustomVideoJsComponent._instance) {
      throw new Error('Singleton class. Cannot instantiate.');
    }
    CustomVideoJsComponent._instance = this;
  }

  public static get instance(): CustomVideoJsComponent {
    return this._instance;
  }

  private createTitleComponent() {
    const videoJsComponent = videoJs.getComponent('Component');
    return videoJs.extend(videoJsComponent, {
      constructor: function (_: ReturnType<typeof videoJs.player>, options: any) {
        videoJsComponent.apply(this, arguments);
        if (options.text) {
          this.updateTextContent(options.text);
        }
      },
      createEl: function () {
        return videoJs.dom.createEl('div', {
          className: 'vjs-title-bar',
        });
      },
      updateTextContent: function (text: string) {
        videoJs.dom.emptyEl(this.el());
        videoJs.dom.appendContent(this.el(), text);
      },
    });
  }

  private createButtonComponent() {
    const Button = videoJs.getComponent('Button');
    return videoJs.extend(Button, {
      constructor: function (player: ReturnType<typeof videoJs.player>, options: any) {
        if (options.show === undefined) {
          options.show = false;
        }
        Button.apply(this, arguments);
        this.on('click', () => {
          options.show = !options.show;
          this.showHideLog(player, !options.show);
        });
      },
      createEl: function () {
        return videoJs.dom.createEl(
          'button',
          {
            className: 'vjs-custom-button',
            innerHTML: 'Custom button. Click and check logs',
            tabIndex: 0,
          },
          {
            role: 'button',
            'aria-live': 'polite',
          }
        );
      },
      showHideLog: function (player: ReturnType<typeof videoJs.player>, show: boolean) {
          if (show) {
            console.log(`Current time is ${player.currentTime()}`);
          } else {
            console.log('Not showing current time');
          }
      },
    });
  }

  registerTitleComponent() {
    const TitleBar = this.createTitleComponent();
    videoJs.registerComponent('TitleBar', TitleBar);
  }

  registerCustomButton() {
    const CustomButton = this.createButtonComponent();
    videoJs.registerComponent('CustomButton', CustomButton);
  }
}

export default CustomVideoJsComponent.instance;
