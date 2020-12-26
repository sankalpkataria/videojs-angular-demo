import { videoJs } from '../videojs';
import { SeekButtonComponent } from "./component";
import { SeekButtonPlugin } from "./plugin";

const registerSeekButtons = () => {
    videoJs.registerComponent('SeekButtonComponent', SeekButtonComponent);
    videoJs.registerPlugin('customSeekButtons', SeekButtonPlugin);
};

registerSeekButtons();
