import { BOUNDARIES, CANVAS_WIDTH, STAGE, CANVAS_HEIGHT, CANVAS, MENU } from "../utils/const.js";
import { lerp } from "../utils/linearInterpolation.js";
export class Viewport {
    constructor(x, y, fighters) {
        this.fighters = fighters;
        this.pos = {x, y};
        this.midX = (this.pos.x + CANVAS_WIDTH-32) / 2;
    }
    update() {

        let targetViewportY = -Math.floor(Math.max(BOUNDARIES.FLOOR - this.fighters[0].pos.y, BOUNDARIES.FLOOR - this.fighters[1].pos.y)/12);
        
        const midpoint = (this.fighters[0].pos.x  + this.fighters[1].pos.x ) / 2;
        let targetViewportX = midpoint - (CANVAS_WIDTH-32) / 2; // -32 to account for camera offset.
     
        //clamp to stage boundaries
        targetViewportX = Math.max(0, Math.min(targetViewportX, STAGE.WIDTH - CANVAS_WIDTH));
        
        //linear interpolation for smoothing.
        this.pos.x = Math.floor(lerp(this.pos.x, targetViewportX, 0.05)); 
        this.pos.y = Math.floor(lerp(this.pos.y, targetViewportY, 0.6));
    }//end update
    drawDebug(ctx) {
        ctx.save();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.moveTo(this.midX, 0);
        ctx.lineTo(this.midX, CANVAS_HEIGHT);
        ctx.stroke();
        ctx.restore();
    }
}//end Viewport class