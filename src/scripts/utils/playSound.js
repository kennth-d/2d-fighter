export function playSound(sound, vol = 0, playbackSpeed = 1) {
    const clone = sound.cloneNode();
    if (vol > 0) {
        clone.volume = vol;
    } else {
        clone.volume = sound.volume;
    }//end if-else
    clone.playbackRate = playbackSpeed;
    clone.play();
};