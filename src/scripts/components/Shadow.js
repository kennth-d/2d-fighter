import {BOUNDARIES} from "../utils/const.js";
export class Shadow {
    constructor(fighter) {
        this.img = document.querySelector('img[alt="shadow"]');
        this.fighter = fighter;
        this.dimensions = {x: 0, y: 0, width: 24, height: 6};
        this.origin = {x: 12, y: 3};
    }
    update() {

    }//end update
    draw(ctx, viewport) {
        const scale = 1 - (BOUNDARIES.FLOOR - this.fighter.pos.y) / 250;
        ctx.globalAlpha = 0.5;
        ctx.drawImage(
            this.img,
            this.dimensions.x,
            this.dimensions.y,
            this.dimensions.width,
            this.dimensions.height,
            Math.floor(this.fighter.pos.x - this.origin.x * scale) - viewport.pos.x,
            Math.floor(BOUNDARIES.FLOOR - this.origin.y * scale) - viewport.pos.y,
            Math.floor(this.dimensions.width * scale),
            Math.floor(this.dimensions.height * scale), 
        )//end drawImage
        ctx.globalAlpha = 1;
    }//end draw
}//end Shadow