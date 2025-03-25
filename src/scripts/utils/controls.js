export const CONTROL = {
    LEFT: "left",
    RIGHT: "right",
    JUMP: "up",
    CROUCH: "down",
    LIGHT_ATK: "light_atk",
    HEAVY_ATK: "heavy_atk",
    SP_1: "sp_1",
    SP_2: "sp_2",
};

/** Maps keyboard inputs to a player index.
 *  CONTROLS_MAP[0] = player 1,
 *  CONTROLS_MAP[1] = player 2.
 **/
export const CONTROLS_MAP = [
    {
        keyboard: {
            [CONTROL.LEFT]: "KeyA",
            [CONTROL.RIGHT]: "KeyD",
            [CONTROL.JUMP]: "KeyW",
            [CONTROL.CROUCH]: "KeyS",
            [CONTROL.LIGHT_ATK]: "KeyH",
            [CONTROL.HEAVY_ATK]: "KeyJ",
            [CONTROL.SP_1]: "KeyK",
            [CONTROL.SP_2]: "KeyL",
        }
    },
    {
        keyboard: {
            [CONTROL.LEFT]: "ArrowLeft",
            [CONTROL.RIGHT]: "ArrowRight",
            [CONTROL.JUMP]: "ArrowUp",
            [CONTROL.CROUCH]: "ArrowDown",
            [CONTROL.LIGHT_ATK]: "KeyY",
            [CONTROL.HEAVY_ATK]: "KeyU",
            [CONTROL.SP_1]: "KeyI",
            [CONTROL.SP_2]: "KeyO",  
        }
    },
]