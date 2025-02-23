//inputLogger for debugging inputs

//class for handling keyboard input.
export class KeyboardInputComponent {
    constructor() {
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
    
}//end cls