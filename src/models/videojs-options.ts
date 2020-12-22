interface Breakpoint {
    tiny: number;
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    huge: number;
}

interface Source {
    src: string;
    type: string;
}

/**
 * Videojs option typeDef
 * For info on each attribute, refer:- 
 * https://github.com/videojs/video.js/blob/main/docs/guides/options.md  
 */
export interface VideoJsOptions {
    autoplay?: boolean | string;
    height?: string | number;
    width?: string | number;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    poster?: string;
    preload?: string;
    src?: string;
    // The above options can also be used as HTMl attributes on <video> element.

    // Videojs specific options:-
    aspectRatio?: string;
    autoSetup?: boolean;
    breakpoints?: Breakpoint;
    children?: Array<any> | Object;
    fluid?: boolean;
    inactivityTimeout?: number;
    language?: string;
    languages?: Object;
    liveui?: boolean;
    nativeControlsForTouch?: boolean;
    notSupportedMessage?: string;
    fullscreen?: Object;
    playbackRates?: Array<any>;
    plugins?: Object;
    responsive?: boolean;
    loadingSpinner?: boolean;
    sources?: Source[];
    suppressNotSupportedError?: boolean;
    techCanOverridePoster?: boolean;
    techOrder?: Array<string>;
    userActions?: any;
    'vtt.js'?: string;
}