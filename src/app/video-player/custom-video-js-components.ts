declare const videojs: any;

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
    const videoJsComponent = videojs.getComponent('Component');
    return videojs.extend(videoJsComponent, {
      constructor: function (_: any, options: any) {
        videoJsComponent.apply(this, arguments);
        if (options.text) {
          this.updateTextContent(options.text);
        }
      },
      createEl: function () {
        return videojs.dom.createEl('div', {
          className: 'vjs-title-bar',
        });
      },
      updateTextContent: function (text: string) {
        videojs.dom.emptyEl(this.el());
        videojs.dom.appendContent(this.el(), text);
      },
    });
  }

  private createButtonComponent() {
    const Button = videojs.getComponent('Button');
    return videojs.extend(Button, {
      constructor: function (player: any, options: any) {
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
        return videojs.dom.createEl(
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
      showHideLog: function (player: any, show: boolean) {
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
    videojs.registerComponent('TitleBar', TitleBar);
  }

  registerCustomButton() {
    const CustomButton = this.createButtonComponent();
    videojs.registerComponent('CustomButton', CustomButton);
  }
}

export default CustomVideoJsComponent.instance;
