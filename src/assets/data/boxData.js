// Box data format: [x, y, width, height]
// Boxes are positioned relative to player position.
// X: pixels left of posX
// y: pixels above posY 
// width: pixel width, 
// height: pixel height

// pushbox: 1 box per frame
// hitbox: 1 box per active frame
// hurt box: 3 boxes per frame
// invincibility frames: animation frame without a hurtBox.

import { F001 } from "./F001_Boxes.js";
import { F002 } from "./F002_Boxes.js";

export { F001, F002 };