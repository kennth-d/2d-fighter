import {TIME} from "../utils/const.js"
export class HitSplash {
    constructor(x, y, type, onFinished) {
        this.pos = {x: (x/320) * 1280, y: (y/180) * 720};
        this.img = {
            hit: document.querySelector('img[alt="on-hit"]'),
            block: document.querySelector('img[alt="on-block"]'),
        };
        this.type = type;
        this.framesPerRow = 4;

        this.currentFrame = 0
        this.currentFrameX = 0;
        this.currentFrameY = 0;
        
        this.width = 1024;
        this.height = 1024;
        this.origin = {
            x: 512,
            y: 512,
        };
        this.animationTimer = 0;
        this.onFinished = onFinished;
    }//end ctor
    update() {
        if (TIME.previous > this.animationTimer + 30) {
            this.currentFrame++;
            this.currentFrameX = (this.currentFrame % this.framesPerRow) * this.width;
            this.currentFrameY = Math.floor(this.currentFrame / this.framesPerRow) * this.height;
            this.animationTimer = TIME.previous;
        }//end if 
        
        if (this.currentFrame >= 16) this.onFinished(this);
    }
    draw(ctx, viewport) {
        const scale = 0.25;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(
            this.img[this.type],
            this.currentFrameX,
            this.currentFrameY,
            this.width,
            this.height,
            this.pos.x - (viewport.pos.x/320) * 1280 - this.origin.x*scale,
            this.pos.y - (viewport.pos.y/180) * 720 - this.origin.y*scale,
            this.width * scale,
            this.height * scale,
        );
    }//end draw
} //end HitSplash