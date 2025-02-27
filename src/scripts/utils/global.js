// --- Global values for the game --- //
export const CANVAS = document.querySelector("canvas");
export const CANVAS_WIDTH = CANVAS.width;
export const CANVAS_HEIGHT = CANVAS.height;

//Physics
export const JUMP_VELOCITY = 350;
export const WALK_VELOCITY = 150;
export const GRAVITY = 1100;

//Screen Boundaries
export const LEFT_BOUNDARY = 0;
export const RIGHT_BOUNDARY = CANVAS_WIDTH;
export const FLOOR = CANVAS_HEIGHT - 100;

export const FIGHTER_WIDTH = 16;

//game settings
export const SETTINGS = {
    rounds: 3,  
    roundTime: 100,
    volume: 50,
    music: true
}

//tracks time between each frame.
export const TIME = {
    delta: 0,
    previous: 0,
}

export const PLAYER_ONE_START = {
    x: (CANVAS_WIDTH / 2) - 98,
    y: FLOOR,
}

export const PLAYER_TWO_START = {
    x: (CANVAS_WIDTH / 2) + 98,
    y: FLOOR,
}




