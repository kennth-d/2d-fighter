import { FighterBaseClass } from "./FighterBaseClass.js";
import { F_001SpriteData } from "../../assets/data/F001_SpriteData.js";

//Fighter_001 class
export class Fighter_001 extends FighterBaseClass {
    constructor(x, y, inputComponent, stateManager, spriteManager) {
        super(x, y, inputComponent);
        this.name = "Fighter_001";
        this.origin = {
            x: 0,
            y: 0
        }
        this.sprite = new Image(F_001SpriteData.WALK_FWD.width, F_001SpriteData.WALK_FWD.height);
        this.sprite.src = F_001SpriteData.WALK_FWD.src;
        this.frames = F_001SpriteData.WALK_FWD.frames;
        this.stateManager = stateManager;
        this.spriteManager = spriteManager;
        this.inputComponent = inputComponent;
    }//end ctor

    update(time) {

        this.pos.x += (this.velocity.x) * time.delta;

        //update the fighter state;
        this.stateManager.activeState.update(this.stateManager, this.inputComponent);
        //this.spriteManager.update()
        if (this.stateManager.activeState.name != this.spriteManager.currentSprite.name) {
            this.spriteManager.changeSprite(this.stateManager.activeState.name);
        }
        if (time.previous > this.animationTimer + 60) {
            this.spriteManager.nextFrame();
            this.animationTimer = time.previous;
            //this.currentFrame = (this.currentFrame + 1) % this.frames;
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
        this.origin.x = this.pos.x + ( this.spriteManager.currentSprite.width / 2 );
        this.origin.y = this.pos.y + (this.spriteManager.currentSprite.height-15);
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

