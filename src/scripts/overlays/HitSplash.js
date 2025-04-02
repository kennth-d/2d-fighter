import {TIME} from "../utils/const.js"
export class HitSplash {
    constructor(x, y, type) {
        this.pos = {x: x, y: y};
        this.img = {
            hit: document.querySelector('img[alt="on-hit"]'),
            block: document.querySelector('img[alt="on-block"]'),
        };
        this.framesPerRow = 4;

        this.currentFrame = 0
        this.currentFrameX = 0;
        this.currentFrameY = 0;
        
        this.width = 256;
        this.height = 256;
        this.origin = {
            x: 128,
            y: 128,
        };
        this.animationTimer = 0;
        this.frameDelay = 4;
    }//end ctor
    update() {
        if (TIME.previous < this.animationTimer + this.frameDelay * TIME.delta) return;
        this.currentFrame++;
        this.currentFrameX = this.currentFrame %this.framesPerRow;
        this.currentFrameY = Math.floor(this.currentFrame / this.framesPerRow);
        this.animationTimer = TIME.previous;
    }
    draw(ctx) {

        ctx.drawImage(
            this.img[this.type],
            this.currentFrameX,
            this.currentFrameY,
            this.width,
            this.height,
            this.pos.x - this.origin.x,
            this.pos.y - this.origin.y,
            this.width,
            this.height,
        );
    }//end draw()
} //end cls

// drawDecal(ctx, img, x, y, width, height, dx, dy, offsetX = 0, offsetY = 0) {

    // ctx.drawImage(
    //     img,
    //     x,
    //     y,
    //     width,
    //     height,
    //     dx - offsetX,
    //     dy - offsetY,
    //     width,
    //     height,
    // );
// }//end drawStatus


// ctx.drawImage(
//     ROUND_STATUS.img,
//     ROUND_STATUS[identifier].x,
//     ROUND_STATUS[identifier].y,
//     ROUND_STATUS[identifier].width,
//     ROUND_STATUS[identifier].height,
//     Math.floor(ctx.canvas.width / 2 - ROUND_STATUS[identifier].width/2),
//     MENU_CENTER.Y - 200,
//     ROUND_STATUS[identifier].width,
//     ROUND_STATUS[identifier].height,
// );