import { characterStates } from "../states/states.js";
import { CANVAS_WIDTH, TIME } from "../utils/const.js";
import { drawDebugBox } from "../utils/debug.js";

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

        //check if sprite needs changing
        let activeStateName = fighter.stateManager.activeState.getName();
        if (activeStateName != this.currentSprite.name) {
            this.changeSprite(activeStateName);
        }

        //update frame
        let delay = this.currentSprite.delay;
        if (TIME.previous > this.animationtimer + 60 * delay) {
            this.nextFrame();
            this.animationtimer = TIME.previous;
        }//end if
    }//end update
    drawSprite(ctx, fighter) {
        //ctx.restore();
        let width = this.currentSprite.img.width;
        let height = this.currentSprite.img.height;
        
        ctx.scale(fighter.direction, 1);
        
        let offsetX = this.currentSprite.originOffset.x;
        let offsetY = this.currentSprite.originOffset.y;
        ctx.drawImage(this.currentSprite.img,
            this.currentFrame * this.currentSprite.img.width,  //sX
            0,                                                 //sY
            width,                                             //sWidth
            height,                                            //sHeight
            fighter.pos.x * fighter.direction - offsetX,       //dX
            fighter.pos.y - offsetY,                           //dY
            width,                                             //dWidth
            height,                                            //dHeight
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        if (fighter.debug) {
            this.draw_debug(ctx, fighter);
        }//end if
    }//end draw

    draw_debug(ctx, fighter) {
        ctx.save();
        ctx.lineWidth = 1;

        //draw x, y
        ctx.beginPath();
        ctx.strokeStyle = "red";
        //vertical line 
        ctx.moveTo(Math.floor(fighter.pos.x) + 0.5, Math.floor(fighter.pos.y-5) + 0.5);
        ctx.lineTo(Math.floor(fighter.pos.x) + 0.5, Math.floor(fighter.pos.y+5) + 0.5);
        //horizontal line
        ctx.moveTo(Math.floor(fighter.pos.x-5) + 0.5, Math.floor(fighter.pos.y) + 0.5);
        ctx.lineTo(Math.floor(fighter.pos.x+5) + 0.5, Math.floor(fighter.pos.y) + 0.5);
        ctx.stroke();

        //pushBox [x, y, width, height]
        const [boxX, boxY, boxWidth, boxHeight] = fighter.boxes.push;  

        //draw pushBox
        drawDebugBox(
            ctx,
            [fighter.pos.x - boxX * fighter.direction, fighter.pos.y - boxY, boxWidth * fighter.direction, boxHeight],
            "#55FF55",
            );

        //draw hurtBox
        for (const box of fighter.boxes.hurt) {
            const [x, y, width, height] = box;
            drawDebugBox(
                ctx,
                [fighter.pos.x - x * fighter.direction, fighter.pos.y - y, width * fighter.direction, height],
                "#7777FF"
            ); //end drawDebug
        }//end for loop
        
        //draw hitBox
        if (fighter.boxes.hit) {
            const [x, y, width, height] = fighter.boxes.hit;
            drawDebugBox(
                ctx,
                [fighter.pos.x - x * fighter.direction, fighter.pos.y - y, width * fighter.direction, height],
                "#FF0000"
            ); //end drawDebug
        }//end if
        
        //draw active state 
        ctx.font = "10px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";

        let x = (fighter.playerId  < 1) ? -50 : 50; //where to draw text
        x += CANVAS_WIDTH/2;
        ctx.fillText(fighter.stateManager.activeState.name, x, 50);
        ctx.restore();
    }//end draw_debug
    changeSprite(state) {
        this.currentSprite = this.sprites[state];
        this.currentFrame = 0;
    }//end changeSprite
    nextFrame() {
        this.currentFrame = (this.currentFrame + 1) % this.currentSprite.frames;
    }// end nextFrame
    getCurrentSpriteFrameCount() {
        return this.currentSprite.frames;
    }//end getSpriteFameCount
    setCurrentFrame(number) {
        if (number > this.getCurrentSpriteFrameCount-1) throw new Error("Error: number exceeds current sprite frame count");
        if (number < 0) throw new Error("Error: number must be greater than or equal to zero.");
        this.currentFrame = number;
    }//end setCurrentFrame
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
    }//end initializeSprites
}
