export class Beatmap {
    /**
     * The event triggers associated with the map.
     */
    private beatEvents:Array<BeatEvent>;

    /**
     * The hits associated with the map.
     */
    private hits:number[];

    /**
     * Constructor initializes a new instance of the {@link Beatmap} class from a specified set of hits.
     * @param hits The timestamps of each hit.
     */
    public constructor(hits:number[]) {
        this.hits = [...hits];
        this.beatEvents = [];
    }

    /**
     * Method sets up a new set of triggers with the given offset and event handler.
     * @param offset The offset in milliseconds after a hit happens that this event should be raised.
     * @param handler An object containing the method called when the event is raised.
     */
    public addOffset(offset:number, handler:BeatEventHandler):void {
        this.hits.forEach((hit) => {
            const newEvent = new BeatEvent(hit + offset);
            newEvent.subscribe(handler);
            this.beatEvents.push(newEvent);
        });
        this.beatEvents.sort((a, b) => a.timestamp - b.timestamp);
    }

    /**
     * Method triggers all the events within a specified interval.
     * @param from The beginning time of the interval.
     * @param to The end time of the interval.
     * @param now The current time to raise the event at.
     */
    public step(from:number, to:number, now:number):void {
        const triggeredEvents = this.beatEvents.filter((e) => e.timestamp >= from && e.timestamp < to);
        triggeredEvents.forEach((e) => {
            e.trigger(now);
        })
    }

    /**
     * Method triggers all the events within a specified interval until now.
     * @param from The beginning time of the interval.
     * @param now The current (end) time of the interval.
     */
    public stepToNow(from:number, now:number):void { this.step(from, now, now); }
}

class BeatEvent {
    public readonly timestamp:number;
    private handlers:Array<BeatEventHandler>;
    
    public constructor(timestamp:number) {
        this.timestamp = timestamp;
    }

    public trigger(currentTime:number):void {
        this.handlers.forEach((handler) => {
            handler.onBeatEventTriggered.call(handler, { secondsElapsed: currentTime - this.timestamp });
        })
    }

    public subscribe(handler:BeatEventHandler) {
        this.handlers.push(handler);
    }

    public unsubscribe(handler:BeatEventHandler) {
        this.handlers = this.handlers.filter(_handler => _handler !== handler);
    }
}

export interface BeatEventHandler {
    onBeatEventTriggered(e:BeatEventArgs):void;
}

export type BeatEventArgs = {
    readonly secondsElapsed:number;
}