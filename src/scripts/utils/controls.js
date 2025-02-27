export const CONTROL = {
    BACKWARD: "backward",
    FORWARD: "forward",
    JUMP: "up",
    CROUCH: "down",
    LIGHT_ATK: "light_atk",
    HEAVY_ATK: "heavy_atk",
    SPECIAL_1: "sp_1",
    SPECIAL_2: "sp_2",
};

//playerID maps to a specific index in CONTROLS_MAP.
export const CONTROLS_MAP = [
    {
        keyboard: {
            [CONTROL.BACKWARD]: "KeyA",
            [CONTROL.FORWARD]: "KeyD",
            [CONTROL.JUMP]: "KeyW",
            [CONTROL.CROUCH]: "KeyS",
            [CONTROL.LIGHT_ATK]: "KeyH",
            [CONTROL.HEAVY_ATK]: "KeyJ",
            [CONTROL.SPECIAL_1]: "KeyK",
            [CONTROL.SPECIAL_2]: "KeyL",
        }
    },
    {
        keyboard: {
            [CONTROL.BACKWARD]: "ArrowLeft",
            [CONTROL.FORWARD]: "ArrowRight",
            [CONTROL.JUMP]: "ArrowUp",
            [CONTROL.CROUCH]: "ArrowDown",
            [CONTROL.LIGHT_ATK]: "KeyY",
            [CONTROL.HEAVY_ATK]: "KeyU",
            [CONTROL.SPECIAL_1]: "KeyI",
            [CONTROL.SPECIAL_2]: "KeyO",  
        }
    }
]
