import { videoJs } from '../videojs';
import { getCurrentTimeComponent } from "./current-time-component";
import { getNotesInputComponent } from "./notes-input-component";
import { getNotesWrapperComponent } from "./notes-wrapper-component";
import { getNotesSaveBtnComponent } from "./save-notes-component";
import { NotesOptions } from "./types";
const Button = videoJs.getComponent('Button');

export class NotesComponent extends Button {
    constructor(player: ReturnType<typeof videoJs.player>, options: NotesOptions) {
        super(player, options);
        this.controlText(this.localize(this.options_.notesBtnTooltip));
    }

    buildCSSClass() {
        // merge our custom and videojs classes together.
        return `vjs-notes-btn notes-icon ${super.buildCSSClass()}`;
    }

    registerComponents() {
        const NotesWrapperComponent = getNotesWrapperComponent();
        const NotesInputComponent = getNotesInputComponent();
        const NotesSaveBtnComponent = getNotesSaveBtnComponent();
        const CurrentTimeComponent = getCurrentTimeComponent();
        videoJs.registerComponent('NotesWrapperComponent', NotesWrapperComponent);
        videoJs.registerComponent('NotesInputComponent', NotesInputComponent);
        videoJs.registerComponent('NotesSaveBtnComponent', NotesSaveBtnComponent);
        videoJs.registerComponent('CurrentTimeComponent', CurrentTimeComponent);
    }

    handleClick() {
        this.registerComponents();
        const notesWrapper = this.player_.addChild('NotesWrapperComponent');
        notesWrapper.addChild('CurrentTimeComponent');
        const notesInput = notesWrapper.addChild('NotesInputComponent');
        const notesSaveBtn = notesWrapper.addChild('NotesSaveBtnComponent');
        notesSaveBtn.on('click', () => {
            const note = notesInput.state.note;
            console.log(note, 'note');
            // Do something here to save the note.
        })
    }
}