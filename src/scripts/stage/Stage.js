export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="stage"]');
        this.frames = {
            foreground: { x: 0,   y: 0, width: 384, height: 204 },
            middle:     { x: 384,   y: 0,   width: 256, height: 192 },
            background: { x: 0, y: 204,   width: 512, height: 192 },
        }
    }//end ctor
    update() {

    }
    draw(ctx, viewport) {
        this.drawFrame(ctx, "background", Math.floor(-100 - viewport.pos.x), -viewport.pos.y);
        this.drawFrame(ctx, "middle", Math.floor(-20 - viewport.pos.x), 30-viewport.pos.y);
        this.drawFrame(ctx, "foreground", Math.floor( -viewport.pos.x), -15 - viewport.pos.y);
    }
    drawFrame(ctx, key, dx, dy) {
        const {x, y, width, height} = this.frames[key];

        ctx.drawImage(
            this.image,
            x, y,
            width,
            height,
            dx, 
            dy,
            width,
            height,
        )//end drawImage
    }//end drawFrame
}//end Stage