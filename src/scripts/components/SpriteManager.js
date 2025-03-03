import { characterStates } from "../states/states.js";
import { CANVAS_WIDTH, DEFAULT_PUSHBOX, TIME } from "../utils/global.js";
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
        
        ctx.scale(fighter.direction, 1);

        //mirroring the image with scale flips the canvas origin to the opposite side.
        //thus needs to be accounted for by adding width to dX only if it is mirrored.
        let offsetX = this.currentSprite.originOffset.x;
        let dX = (fighter.direction < 0) ? (fighter.pos.x + width - offsetX) * fighter.direction : fighter.pos.x;
        ctx.drawImage(this.currentSprite.img,
            this.currentFrame * this.currentSprite.img.width,  //sX
            0,                                                 //sY
            width,                                             //sWidth
            height,                                            //sHeight
            dX,                                                //dX
            fighter.pos.y,                                     //dY
            width,                                             //dWidth
            height,                                            //dHeight
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        if (fighter.debug) {
            this.draw_debug(ctx, fighter);
        }//end if
    }//end draw

    draw_debug(ctx, fighter) {  
        ctx.lineWidth = 1;

        //draw x, y
        ctx.beginPath();
        ctx.strokeStyle = "white";
        //vertical line 
        ctx.moveTo(Math.floor(fighter.pos.x) + 0.5, Math.floor(fighter.pos.y-5) + 0.5);
        ctx.lineTo(Math.floor(fighter.pos.x) + 0.5, Math.floor(fighter.pos.y+5) + 0.5);
        //horizontal line
        ctx.moveTo(Math.floor(fighter.pos.x-5) + 0.5, Math.floor(fighter.pos.y) + 0.5);
        ctx.lineTo(Math.floor(fighter.pos.x+5) + 0.5, Math.floor(fighter.pos.y) + 0.5);
        ctx.stroke();

        //draw origin points
        ctx.beginPath();
        //vertical line 
        ctx.strokeStyle = "red";
        ctx.moveTo(Math.floor(fighter.origin.x) + 0.5, Math.floor(fighter.origin.y-5) + 0.5);
        ctx.lineTo(Math.floor(fighter.origin.x) + 0.5, Math.floor(fighter.origin.y+5) + 0.5);
        //horizontal line
        ctx.moveTo(Math.floor(fighter.origin.x-5) + 0.5, Math.floor(fighter.origin.y) + 0.5);
        ctx.lineTo(Math.floor(fighter.origin.x+5) + 0.5, Math.floor(fighter.origin.y) + 0.5);
        ctx.stroke();

        //draw pushBox
        ctx.beginPath();
        //vertical line 
        ctx.strokeStyle = "blue";
        ctx.moveTo(Math.floor(fighter.pushBox.x) + 0.5, Math.floor(fighter.pushBox.y-5) + 0.5);
        ctx.lineTo(Math.floor(fighter.pushBox.x) + 0.5, Math.floor(fighter.pushBox.y+5) + 0.5);
        //horizontal line
        ctx.moveTo(Math.floor(fighter.pushBox.x-5) + 0.5, Math.floor(fighter.pushBox.y) + 0.5);
        ctx.lineTo(Math.floor(fighter.pushBox.x+5) + 0.5, Math.floor(fighter.pushBox.y) + 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#55FF55";
        ctx.fillStyle = "#55FF5555";
        ctx.fillRect(
            Math.floor(fighter.pushBox.x) + 0.5,
            Math.floor(fighter.pushBox.y) + 0.5,
            fighter.pushBox.width,
            fighter.pushBox.height,
        );
        ctx.rect(
            Math.floor(fighter.pushBox.x) + 0.5,
            Math.floor(fighter.pushBox.y) + 0.5,
            fighter.pushBox.width,
            fighter.pushBox.height,
        );
        ctx.stroke();

        //draw active state 
        ctx.font = "10px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";

        let x = (fighter.playerId  < 1) ? -50 : 50; //where to draw text
        x += CANVAS_WIDTH/2;
        ctx.fillText(fighter.stateManager.activeState.name, x, 25);
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
                pushBox: (spriteData[state].pushBox != undefined) ? spriteData[state].pushBox : DEFAULT_PUSHBOX,
            }
            this.sprites[state].img.src = spriteData[state].src;
        })//end for
    }
}
