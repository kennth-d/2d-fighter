//inputLogger for debugging inputs
const inputLogger = document.querySelector('#inputLogger p');

// Input component class
// will read keyboard inputs
//Interface Class for Input Components
class InputComponent {
    constructor(fighter, debug) {
        this.WALK_ACCELERATION = 1;
        this.logger = inputLogger;
        this.fighter = fighter
        this.debug = debug;
    }//end ctor

    initListeners() {
        throw new Error("initListeners must be implemented")
    }
    update() {
        throw new Error("update method must be implemented.")
    }//end update
}//end InputComponent

//class for handling keyboard input.
export class KeyboardInputComponent extends InputComponent {
    constructor(fighter, debug = true) {
        super(fighter, debug);
        this.keys = {};
        
    }//end ctor

    //precondition: fighter has been initialized
    initListeners() {
        window.addEventListener("keypress", (event) => {
            this.keys[event.code] = true; //update keys dict

            if (this.debug) { this.logger.innerHTML = event.code; } //update logger

            this.update();
        });
        window.addEventListener("keyup", (event) => this.keys[event.code] = false);
    }
    //experimental update
    update() {
        if (this.keys["KeyA"]) {
            this.fighter.x -= this.WALK_ACCELERATION;
        }

        if (this.keys["KeyD"]) {
            this.fighter.x += this.WALK_ACCELERATION;

        }
    }
}//end cls