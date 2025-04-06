import * as boxes from "../../assets/data/boxData.js";

/** gets box data for a Fighter's current state and animation frame.
 * 
 * @param {string} fighter Fighter.name
 * @param {string} state current state/animation of the fighter.
 * @param {string} boxType push, hurt or hit.
 * @param {int} frame current frame of the fighter's animation.
 * @returns [x, y, w, h] for push and hit boxes. [[x, y, w, h],[x, y, w, h],[x, y, w, h]] for hurt boxes.
 */
export function getBoxes(fighter, state, boxType, frame) {
    return boxes[fighter][boxType][state][frame];
}//end getBoxes

