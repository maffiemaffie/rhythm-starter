// import { clock, TickEventArgs, Tickable } from 'maffie-clock';
import { TrackPlayer } from './track-playback';

const player = new TrackPlayer('../assets/120-bpm.mp3');

document.querySelector('#play-btn').addEventListener('click', () => {
    player.play();
});