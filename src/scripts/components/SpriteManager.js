import { characterStates } from "../states/states.js";
import { TIME } from "../utils/global.js";
// --- class for managing the player sprites ---//
// ---------------------------------------------//
export class FighterSpriteManager {
    constructor(spriteData) {
        this.sprites = {};
        this.currentSprite;
        this.currentFrame = 0;
        this.animationtimer = 0;

        this.initializeSprites(spriteData);
        this.currentSprite = this.sprites.IDLE;
    }
    update(fighter) {
        //update sprite
        if (fighter.stateManager.activeState.name != this.currentSprite.name) {
            this.changeSprite(fighter.stateManager.activeState.name);
        }

        //update frame
        let delay = this.currentSprite.delay;
        if (TIME.previous > this.animationtimer + 60 * delay) {
            this.nextFrame();
            this.animationtimer = TIME.previous;
        }//end if
    }//end update
    drawSprite(ctx, fighter) {
        let width = this.currentSprite.img.width;
        let height = this.currentSprite.img.height;
        
        this.currentSprite.img.style.border="20px solid white";
        ctx.scale(fighter.direction, 1);
        ctx.drawImage(this.currentSprite.img,
            this.currentFrame * this.currentSprite.img.width,  //sX
            0,                                                 //sY
            width,                      //sWidth
            height,                     //sHeight
            // fighter.pos.x * fighter.direction,                 //dX
            // fighter.pos.y,
            fighter.pos.x * fighter.direction,                 //dX
            fighter.pos.y,                                     //dY
            width,                      //dWidth
            height,                     //dHeight
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        
        if (fighter.debug) {
            this.draw_debug(ctx, fighter);
        }//end if
    }//end draw

    draw_debug(ctx, fighter) {  

        let offset = this.currentSprite.originOffset;
        fighter.origin.x =  fighter.pos.x + ( fighter.direction * (this.currentSprite.img.width - offset) / 2);
        fighter.origin.y = fighter.pos.y + (this.currentSprite.img.height - 8);
        ctx.lineWidth = 1;

        //draw vertical
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(fighter.origin.x, fighter.origin.y-5);
        ctx.lineTo(fighter.origin.x, fighter.origin.y+5);
        ctx.stroke();

        //draw horizontal
        ctx.beginPath();
        ctx.moveTo(fighter.origin.x-5, fighter.origin.y);
        ctx.lineTo(fighter.origin.x+5, fighter.origin.y);
        ctx.stroke();
        ctx.font = "20px serif";
        ctx.fillStyle = "white";

        ctx.fillText(fighter.stateManager.activeState.name, 169, 50);
    }//end draw_debug

    changeSprite(state) {
        this.currentSprite = this.sprites[state];
        this.currentFrame = 0;
    }//end changeSprite
    
    nextFrame() {
        this.currentFrame = (this.currentFrame + 1) % this.currentSprite.frames;
    }// end nextFrame
    initializeSprites(spriteData) {
        characterStates.forEach(state => {
            this.sprites[state] = {
                name: state,
                img: new Image(spriteData[state].width, spriteData[state].height),
                frames: spriteData[state].frames,
                originOffset: (spriteData[state].originOffset != undefined) ? spriteData[state].originOffset : 0,
                delay: (spriteData[state].delay != undefined) ? spriteData[state].delay : 1,
            }
            this.sprites[state].img.src = spriteData[state].src;
        })//end for
    }
}
