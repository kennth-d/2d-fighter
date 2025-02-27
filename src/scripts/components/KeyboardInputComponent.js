import { CONTROL, CONTROLS_MAP } from "../utils/controls.js";
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
        this.registerListeners();
    }//end ctor

    registerListeners() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }//end registerListeners
    removeListeners() {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keydown", handleKeyUp);
    }//end removeListeners
    isKeyDown(code) {
        return this.heldKeys.has(code);
    }//end isKeyDown
    isKeyUp(code) {
        return !this.heldKeys.has(code);
    }//end isKeyUp
    isForward() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.FORWARD]);
    }
    isBackward() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.BACKWARD]);
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
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.SPECIAL_1]);
    }
    isSP_2() {
        return this.isKeyDown(CONTROLS_MAP[this.id].keyboard[CONTROL.SPECIAL_2]);
    }
    
}//end cls