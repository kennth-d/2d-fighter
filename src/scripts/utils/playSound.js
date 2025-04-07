export function playSound(sound) {
    const clone = sound.cloneNode();
    clone.volume = sound.volume;
    clone.play();
};