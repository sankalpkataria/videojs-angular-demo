import { videoJs } from '../videojs';
import { SeekOptions } from "./types";
const Button = videoJs.getComponent('Button');

export class SeekButtonComponent extends Button {
    constructor(player: ReturnType<typeof videoJs.player>, options: SeekOptions) {
        super(player, options);
        if (this.options_.forward) {
            this.controlText(this.localize(this.options_.fwdBtnTooltip));
        }
        if (this.options_.backward) {
            this.controlText(this.localize(this.options_.bwdBtnTooltip));
        }
    }

    buildCSSClass() {
        let classes = 'vjs-custom-seek-button'
        if (this.options_.forward) {
            classes = `${classes} seek-forward`;
        }
        if (this.options_.backward) {
            classes = `${classes} seek-backward`;
        }
        // merge our custom and videojs classes together.
        return `${classes} ${super.buildCSSClass()}`;
    }

    handleClick() {
        const currentTime = this.player_.currentTime();
        if (this.options_.forward) {
            this.player_.currentTime(currentTime + this.options_.forward);
        } else if (this.options_.backward) {
            this.player_.currentTime(currentTime - this.options_.backward);
        }
    }
}