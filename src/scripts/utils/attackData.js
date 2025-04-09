const LIGHT_ATTACK = {
    dmg: 5,
    hitstun: .5,
    knockback: 75,
};
const HEAVY_ATTACK = {
    dmg: 10,
    hitstun: .7,
    knockback: 200,
};
const SP_1 = {
    dmg: 15,
    hitstun: .5,
    knockback: 200,
};
const SP_2 = {
    dmg: 7,
    hitstun: .3,
    knockback: 25,
};
const JUMP_ATTACK = {
    dmg: 10,
    hitstun: .7,
    knockback: 150,
}

const SOUNDS = {
    LIGHT_ATTACK: {
        swing: document.querySelector("audio#light-swing"),
        hit: document.querySelector("audio#light-hit"),
    },
    HEAVY_ATTACK: {
        swing: document.querySelector("audio#heavy-swing"),
        hit: document.querySelector("audio#heavy-hit"),
    },
    SP_1: {
        swing: document.querySelector("audio#sp-1-swing"),
        hit: document.querySelector("audio#sp-1-hit"),
    },
    SP_2: {
        swing: document.querySelector("audio#sp-2-swing"),
        hit: document.querySelector("audio#sp-2-hit"),
    },
    BLOCK: {
        hit: document.querySelector("audio#block"),
    },
    JUMP_ATTACK: {
        swing: document.querySelector("audio#heavy-swing"),
        hit: document.querySelector("audio#heavy-hit"),
    },
};
const HIT_STOP = .15;
export { LIGHT_ATTACK, HEAVY_ATTACK, SP_1, SP_2, HIT_STOP, JUMP_ATTACK, SOUNDS };