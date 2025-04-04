import { BOUNDARIES, CANVAS_WIDTH, TIME, STAGE, CANVAS, CANVAS_HEIGHT } from "../utils/const.js";
export class Viewport {
    constructor(x, y, fighters) {
        this.fighters = fighters;
        this.pos = {x, y};
        this.speed = 10;
        this.margin = 50;
        this.deadZone = {left: 50, right: CANVAS_WIDTH - 50};
    }
    update() {
        //TODO: fix issue of left fighter being able to drag the camera.
        const leftF = this.fighters[0].pos.x < this.fighters[1].pos.x ? this.fighters[0] : this.fighters[1];
        const rightF = this.fighters[0].pos.x < this.fighters[1].pos.x ? this.fighters[1] : this.fighters[0];

        let targetViewportY = -Math.floor(Math.max(BOUNDARIES.FLOOR - this.fighters[0].pos.y, BOUNDARIES.FLOOR - this.fighters[1].pos.y)/12);

        const midpoint = (this.fighters[0].pos.x + this.fighters[1].pos.x) / 2;
        let targetViewportX = midpoint - CANVAS_WIDTH / 2;

        //clamp to stage boundaries
        targetViewportX = Math.max(0, Math.min(targetViewportX, STAGE.WIDTH - CANVAS_WIDTH));

        //linear interpolation for smoothing.
        this.pos.x = Math.floor(this.lerp(this.pos.x, targetViewportX, 0.05)); 
        this.pos.y = Math.floor(this.lerp(this.pos.y, targetViewportY, 0.6));

    }//end update
    drawDebug(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.deadZone.left, 0, this.deadZone.right - this.deadZone.left, CANVAS_HEIGHT);
        ctx.globalAlpha = 1;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.moveTo((this.pos.x + CANVAS_WIDTH/2 - this.pos.x), 0);
        ctx.lineTo((this.pos.x + CANVAS_WIDTH/2 - this.pos.x), CANVAS_HEIGHT);
        ctx.stroke();
        ctx.restore();
    }
    lerp(a, b, t) {
        return a + (b - a) * t;
    }//end interpolate
}//end Viewport class