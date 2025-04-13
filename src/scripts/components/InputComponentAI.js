export const VALID_INPUTS = new Set(["forward", "backward", "jump", "idle", "crouch", "light", "heavy", "sp1", "sp2"]);

export class InputComponentAI {
    constructor() {
        this.inputs = {};
        this.lastInput = undefined;
        this.disabled = true;
        this.id;
        
        for (const input of VALID_INPUTS) {
            this.inputs[input] = false;
        }//end for
    }//end ctor
    /**
     * Assigns the key input to the value passed in.
     * @param {String} key desired input you wish to set. 
     * @param {Boolean} value true or false.
     * @throws {Error} if key is not a valid input.
     */
    setInput(key, value) {
        if (this.isDisabled()) return;
        if (!VALID_INPUTS.has(key)) return;

        this.inputs[key] = value;
        this.lastInput = key;
    }//end setInput
    enable() {
        this.disabled = false;
    }
    disable() {
        this.disabled = true;
        this.clear();
    }
    clear() {
        for (const input in this.inputs) {
            this.inputs[input] = false;
        }//end for
    }
    isDisabled() {
        return this.disabled;
    }
    isForward() {
        return this.inputs.forward;
    }
    isBackward() {
        return this.inputs.backward;
    }
    isJump() {
        return this.inputs.jump;
    }
    isCrouch() {
        return this.inputs.crouch;
    }
    isLight() {
        return this.inputs.light;
    }
    isHeavy() {
        return this.inputs.heavy;
    }
    isSP_1() {
        return this.inputs.sp1;
    }
    isSP_2() {
        return this.inputs.sp2;
    }
}//end InputComponentAI