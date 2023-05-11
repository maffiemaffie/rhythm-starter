export class TrackPlayer {
    private audioCtx:AudioContext;
    private track:HTMLMediaElement;

    public constructor(filepath:string) {
        this.audioCtx = new AudioContext();
        this.track = new Audio();
        this.track.src = filepath;

        this.audioCtx.createMediaElementSource(this.track).connect(this.audioCtx.destination);
    }

    public play() {
        this.track.play();
    }

    public pause() {
        this.track.pause();
    }
}