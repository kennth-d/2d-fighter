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
    draw(ctx) {
        this.drawFrame(ctx, "background", 0, 0);
        this.drawFrame(ctx, "middle", 0, 0);
        this.drawFrame(ctx, "foreground", 0, 12);
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