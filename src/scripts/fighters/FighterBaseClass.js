import { OpponentDirection } from "../utils/global.js";
//class for maintaining the characters
export class FighterBaseClass {
    constructor(x, y, playerId) {
        this.playerId = playerId;
        this.direction = (!playerId) ? OpponentDirection.RIGHT : OpponentDirection.LEFT;
        this.debug = false;
        this.health = 100;
        this.energy = 100;
        this.pos = {x: x, y: y};
        this.origin = {x: this.pos.x, y: this.pos.y};
        this.velocity = {x: 0, y: 0};
        this.boxes = {push:[], hurt:[], hit:[]};  
    }//end ctor

    update() {
        throw new Error("update method must be implemented.");
    }//end update
    draw(ctx) {
        throw new Error("Draw method must be implemented.")
    }//end draw
}//end ctor