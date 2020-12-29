import { videoJs } from '../videojs';
import { NotesComponent } from "./component";
import { NotesPlugin } from "./plugin";

const registerSeekButtons = () => {
    videoJs.registerComponent('NotesComponent', NotesComponent);
    videoJs.registerPlugin('notesButton', NotesPlugin);
};

registerSeekButtons();
