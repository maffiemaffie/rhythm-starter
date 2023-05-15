import { Beatmap } from "./beatmap";

export class BeatManager {
    private beatmap:Beatmap;
    private lastUpdate:number = 0;

    /**
     * update
     */
    public update(currentTime) {
        this.beatmap.stepToNow(this.lastUpdate, currentTime);
        this.lastUpdate = currentTime;
    }
}