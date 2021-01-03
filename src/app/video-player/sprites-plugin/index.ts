import { videoJs } from '../videojs';
import { getSpritesComponent } from "./component";
import { SpritesPlugin } from "./plugin";

const registerSprites = () => {
    const SpritesComponent = getSpritesComponent();
    videoJs.registerComponent('SpritesComponent', SpritesComponent);
    videoJs.registerPlugin('sprites', SpritesPlugin);
};

registerSprites();
