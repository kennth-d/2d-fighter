import { AiStateManager } from "./AIStateManager";

const VALID_INPUTS = new Set(["forward", "backward", "jump", "idle", "crouch", "light", "heavy", "sp1", "sp2"]);

class InputComponentAI {
    constructor(fighter) {
        this.fighter = fighter;
        this.stateManager = new AiStateManager(this, fighter);
        this.inputs = {};
        
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
        if (!VALID_INPUTS.has(key)) throw new Error("attempted to set an invalid input, input: ", newInput);
        if (!value) throw new Error("attempted to set a key without a value.");

        this.inputs[key] = value;
    }//end setInput
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

let ai = new InputComponentAI("PUPPY");