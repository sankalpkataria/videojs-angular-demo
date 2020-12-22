import { Component } from '@angular/core';
import { VideoJsOptions } from "src/models/videojs-options";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  videoJsOptions: VideoJsOptions = {
    controls: true,
    loadingSpinner: true,
    height: "480",
    width: "640",
    sources: [{
      src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
      type: 'application/x-mpegURL'
    }],
    plugins: {
      seekButtons: {
        forward: 10,
        back: 10
      }
    }
  };
}
