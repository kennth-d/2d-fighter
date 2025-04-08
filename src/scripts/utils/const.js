/**@type { HTMLCanvasElement } */
export const CANVAS = document.querySelector("canvas#low-res-screen");
/**@type { number } the width of CANVAS*/
export const CANVAS_WIDTH = CANVAS.width;
/**@type { number } the height of CANVAS*/
export const CANVAS_HEIGHT = CANVAS.height;

export const MAX_HEALTH = 100;
export const MAX_ENERGY = 100;
export const ENERGY_REGEN_POWER = 8;

/**
 * Stores the high res canvas canvas.
 * @typedef { MENU }
 * @property { HTMLCanvasElement } element canvas#high-res-screen.
 * @property { number } WIDTH canvas#high-res-screen width
 * @property { number } HEIGHT canvas#high-res-screen height
 * @property { number } centerX center of menu screen x.
 * @property { number } centerY center of menu screen y.
 */
export const MENU = {
    canvasElement: document.querySelector("#high-res-screen"),
    width: 1280,
    height: 720,
    centerX: 1280/2,
    centerY: 720/2,
}

/**
 * defines various physics values
 * @typedef { PHYSICS }
 * @property { number } jumpVelocity initial velocity when jumping.
 * @property { number } walkFwdVelocity velocity for walking forward.
 * @property { number } walkBwdVelocity velocity for walking backward.
 * @property { number } floatVelocity velocity for floating.
 * @property { number } gravity value for gravity. 
 */
export const PHYSICS = {
    jumpVelocity: 400,
    walkspeed: 10,
    maxWalkspeed: 70,
    airAcceleration: 10,
    maxFloatSpeed: 75,
    gravity: 700,
    friction: 0.8,
    airResistance: 0.99,
}
/**defines boundaries of the game.
 * @typedef BOUNDARIES
 * @property { number } LEFT 0
 * @property { number } RIGHT width of the canvas used for rendering the game.
 * @property { number } FLOOR y position of the floor.
 */
export const BOUNDARIES = {
    LEFT: 0,
    RIGHT: CANVAS_WIDTH,
    FLOOR: CANVAS_HEIGHT - 10
}
export const STAGE = {
    WIDTH: 384,
    HEIGHT: 225,
}

/**defines settings for the game.
 * @typedef DEFAULT_SETTINGS
 * @property { number } rounds number of rounds per match.
 * @property { number } roundDuration number of seconds per round.
 * @property { number } volume volume level percentage.
 * @property { string } music ON/OFF.
 */
export const DEFAULT_SETTINGS = {
    rounds: 3,  
    roundDuration: 200,
    volume: 50,
    music: "OFF",
    initVolume: () => {
        const audioTags = document.querySelectorAll("audio");
        for (const tag of audioTags) {
            tag.volume = (tag.volume * .5);
        };
    },
};

/**defines properties for managing time and a method for updating time.
 * @typedef TIME 
 * @property { number } delta time between the most recent timestamp and TIME.previous.
 * @property { number } previous previous timestamp value.
 * @property { number } fps stores the current frames per second.
 * @property { function(number): void } update TIME properties.
 */
export const TIME = {
    delta: 0,
    previous: 0,
    fps: 0,
    hitStopTimer: 0,
    update: (timestamp) => {
        TIME.delta = (timestamp - TIME.previous) / 1000;
        TIME.previous = timestamp;
        TIME.fps = Math.trunc(1 / TIME.delta);
    },
}//end time

/**
 * start positions for fighters
 * @typedef START_POSITIONS
 * @property { object } playerOne player one
 * @property { object } playerTwo player two
 * @property { number } playerOne.x x position of player one start.
 * @property { number } playerOne.y y position of player one start.
 * @property { number } playerTwo.x x position of player two start.
 * @property { number } playerTwo.y y position of player two start.
 */
export const START_POSITIONS = {
    playerOne: {
        x: STAGE.WIDTH/2 - 24,
        y: BOUNDARIES.FLOOR,
    },
    playerTwo: {
        x: STAGE.WIDTH/2 + 24,
        y: BOUNDARIES.FLOOR,
    }
}//end START_POSITIONS

/**
 * defines left and right so that calculations can be mirrored accordingly.
 * @typedef OPPONENT_DIRECTION
 * @property { number } RIGHT 1
 * @property { number } LEFT -1
 */
export const OPPONENT_DIRECTION = {
    RIGHT: 1,
    LEFT: -1,
}