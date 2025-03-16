import { TIME } from "./global.js";
//returns a 2D context 
export function getContext2D(selector) {
    const canvas = document.querySelector(selector);
    const ctx = canvas.getContext('2d');
    return ctx;
}//end getContext

export function updateTime(timestamp) {
    TIME.delta = (timestamp - TIME.previous) / 1000;
    TIME.previous = timestamp;
    TIME.FPS = Math.trunc(1 / TIME.delta);
}
