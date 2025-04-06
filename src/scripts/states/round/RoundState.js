export class RoundState {
    constructor(manager) {
        this.manager = manager;
        this.name = this.constructor.name;
    }//end ctor
    enter() {
        console.warn(this.constructor.name, " enter method not implemented.");
    }//end enter
    update(dt) {
        console.warn(this.constructor.name, " update method not implemented.");
    }//end update
    draw() {
        console.warn(this.constructor.name, " draw method not implemented.");
    }//end draw
    exit() {
        console.warn(this.constructor.name, " exit method not implemented.");
    }//end exit
}//end RoundState