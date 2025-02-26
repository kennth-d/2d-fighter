import { characterStates } from "../states/states.js";
import { TIME } from "../utils/global.js";
// --- class for managing the player sprites ---//
// ---------------------------------------------//
export class FighterSpriteManager {
    constructor(spriteData) {
        this.sprites = {};
        this.currentSprite;
        this.currentFrame = 0;

        this.initializeSprites(spriteData);
        this.currentSprite = this.sprites.IDLE;
    }
    changeSprite(state) {
        this.currentSprite = this.sprites[state];
        this.currentFrame = 0;
    }
    nextFrame() {
        this.currentFrame = (this.currentFrame + 1) % this.currentSprite.frames;
    }
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
