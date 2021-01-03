import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { VideoJsOptions } from "src/models/videojs-options";
import CustomVideoJsComponent from "./custom-video-js-components";
import "./seek-plugin";
import "./notes-plugin";
import "./sprites-plugin";
import { videoJs } from './videojs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnDestroy, AfterViewInit {
  @ViewChild('target', { static: true })
  target!: ElementRef;
  @Input() options: VideoJsOptions = {};
  player: any;

  constructor() { }

  ngAfterViewInit(): void {
    CustomVideoJsComponent.registerTitleComponent();
    CustomVideoJsComponent.registerCustomButton();
    this.player = videoJs(this.target.nativeElement, this.options, this.onPlayerReady.bind(this));
    this.player.customSeekButtons({
      forward: 20,
      backward: 15,
      fwdBtnPosition: 1,
      bwdBtnPosition: 1,
      fwdBtnTooltip: `Seek 20 seconds forward`,
      bwdBtnTooltip: `Seek 15 seconds backward`
    });
    this.player.notesButton({});
    this.player.sprites({
      spritesUrl: 'https://storage.googleapis.com/hubert-raymond-webpage/The_Hustler(1961)-sprites-256x144.png'
    });
  }

  onPlayerReady() {
    console.log('Player is ready.');
    this.player.addChild('TitleBar', { text: 'Custom title bar component.' });
    this.player.addChild('CustomButton');
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

}
