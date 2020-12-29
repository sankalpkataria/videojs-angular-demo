import { videoJs } from '../videojs';
import { NotesOptions } from './types';

const Plugin = videoJs.getPlugin('plugin');

export class NotesPlugin extends Plugin {
  constructor(player: ReturnType<typeof videoJs.player>, options: NotesOptions) {
    super(player, options);
    player.on('ready', () => {
      this.onPlayerReady(player, this.getOptions(options));
    });
  }

  onPlayerReady(player: ReturnType<typeof videoJs.player>, options: NotesOptions) {
    player.controlBar.notes = player.controlBar.addChild('NotesComponent', {
      fwdBtnTooltip: options.notesBtnTooltip
    }, options.notesBtnPosition);
  }
  getOptions(options: NotesOptions) {
    const defaultPositions = {
      notesBtnPosition: 1
    };
    const defaultTooltips = {
      notesBtnTooltip: `Add Notes`
    };
    return videoJs.mergeOptions(defaultTooltips, defaultPositions, options);
  }
}