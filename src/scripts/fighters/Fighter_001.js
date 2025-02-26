import { FighterBaseClass } from "./FighterBaseClass.js";
import { TIME } from "../utils/global.js";

//Fighter_001 class
export class Fighter_001 extends FighterBaseClass {
    constructor(x, y, playerId, inputComponent, stateManager, spriteManager) {
        super(x, y, playerId);
        this.origin = {x: x, y: y};
        this.stateManager = stateManager;
        this.spriteManager = spriteManager;
        this.input = inputComponent;
    }//end ctor

    update() {
        //update the fighter state;
        this.stateManager.activeState.update(this.stateManager, this.input);

        if (this.stateManager.activeState.name != this.spriteManager.currentSprite.name) {
            this.spriteManager.changeSprite(this.stateManager.activeState.name);
        }
        let delay = this.spriteManager.currentSprite.delay;
        if (TIME.previous > this.animationTimer + 60 * delay) {
            this.spriteManager.nextFrame();
            this.animationTimer = TIME.previous;
        }
    }//end update

    draw(ctx) {
        let sprite = this.spriteManager.currentSprite.img;
        let width = sprite.width;
        let height = sprite.height;
        let currentFrame = this.spriteManager.currentFrame

        ctx.drawImage(sprite,
            currentFrame * width,  //sX
            0,                     //sY
            width,                 //sWidth
            height,                //sHeight
            this.pos.x,            //dX
            this.pos.y,            //dY
            width,                 //dWidth
            height,                //dHeight
        );
        
        
        if (this.debug) {
            this.draw_debug(ctx);
        }//if
    }//end draw

    draw_debug(ctx) {
        let offset = this.spriteManager.currentSprite.originOffset;
        this.origin.x = this.pos.x + ((this.spriteManager.currentSprite.img.width - offset) / 2);
        this.origin.y = this.pos.y + (this.spriteManager.currentSprite.img.height-8);
        ctx.lineWidth = 1;
        

        //draw vertical
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.origin.x, this.origin.y-5);
        ctx.lineTo(this.origin.x, this.origin.y+5);
        ctx.stroke();

        //draw horizontal
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.origin.x-5, this.origin.y);
        ctx.lineTo(this.origin.x+5, this.origin.y);
        ctx.stroke();
        ctx.font = "20px serif";
        ctx.fillStyle = "white";
        ctx.fillText(this.stateManager.activeState.name, 169, 50);
    }//end debug
}

