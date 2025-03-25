// --- Global values for the game --- //
export const CANVAS = document.querySelector("canvas#low-res-screen");
export const CANVAS_WIDTH = CANVAS.width;
export const CANVAS_HEIGHT = CANVAS.height;

export const MENU_SCREEN_SIZE = {
    WIDTH: 1280,
    HEIGHT: 720,
}
export const MENU_CENTER = {
    X: MENU_SCREEN_SIZE.WIDTH/2,
    Y: MENU_SCREEN_SIZE.HEIGHT/2
}

//Physics
export const JUMP_VELOCITY = 350;
export const WALK_VELOCITY_FWD = 125;
export const WALK_VELOCITY_BWD = 75;
export const FLOAT_VELOCITY = 75;
export const GRAVITY = 1100;

//Screen Boundaries
export const LEFT_BOUNDARY = 0;
export const RIGHT_BOUNDARY = CANVAS_WIDTH;
export const FLOOR = CANVAS_HEIGHT - 40;

//game settings
export const DEFAULT_SETTINGS = {
    rounds: 3,  
    roundDuration: 200,
    volume: 50,
    music: "ON",
}

//tracks time between each frame.
export const TIME = {
    delta: 0,
    previous: 0,
    FPS: 0,
}

//left side start
export const PLAYER_ONE_START = {
    x: (CANVAS_WIDTH / 2) - 24,
    y: FLOOR,
}

//right side start
export const PLAYER_TWO_START = {
    x: (CANVAS_WIDTH / 2) + 24,
    y: FLOOR,
}

//pushbox defaults
export const DEFAULT_PUSHBOX = {
    width: 15, 
    height: 30
};

export const OpponentDirection = {
    RIGHT: 1,
    LEFT: -1,
}