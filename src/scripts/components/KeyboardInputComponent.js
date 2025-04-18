import { CONTROL, CONTROLS_MAP } from "../utils/controls.js";
import { OPPONENT_DIRECTION } from "../utils/const.js";
//class for handling keyboard input.
export class KeyboardInputComponent {
    constructor(id) {
        this.id = id;
        this.heldKeys = new Set();
        this.handleKeyDown = (event) => {
            this.heldKeys.add(event.code);
        }
        this.handleKeyUp = (event) => {
            this.heldKeys.delete(event.code);
        }
        //this.enable();
    }//end ctor

    enable() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }//end registerListeners
    disable() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keydown", this.handleKeyUp);
    }//end removeListeners
    isKeyDown(code) {
        return this.heldKeys.has(code);
    }//end isKeyDown
    isKeyUp(code) {
        return !this.heldKeys.has(code);
    }//end isKeyUp
    isLeft() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.LEFT]);
    }
    isRight() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.RIGHT]);
    }
    isForward(fighter) {
        return (fighter.direction === OPPONENT_DIRECTION.RIGHT) ? this.isRight() : this.isLeft();
    }
    isBackward(fighter) {
        return (fighter.direction === OPPONENT_DIRECTION.LEFT) ? this.isRight() : this.isLeft();
    }
    isJump() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.JUMP]);
    }
    isCrouch() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.CROUCH]);
    }
    isLight() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.LIGHT_ATK]);
    }
    isHeavy() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.HEAVY_ATK]);
    }
    isSP_1() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.SP_1]);
    }
    isSP_2() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.SP_2]);
    }
    
}//end cls