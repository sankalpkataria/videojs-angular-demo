import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { VideoJsOptions } from "src/models/videojs-options";
import CustomVideoJsComponent from "./custom-video-js-components";
declare const videojs: any;

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
    this.player = videojs(this.target.nativeElement, this.options, this.onPlayerReady.bind(this));
  }

  onPlayerReady() {
    console.log('Player is ready. Do something here.');
    this.player.addChild('TitleBar', { text: 'Custom title bar component.' });
    this.player.addChild('CustomButton');
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

}
