import { characterStates } from "../states/states.js";

// --- class for managing the player sprites ---//
// ---------------------------------------------//
export class FighterSpriteManager {
    constructor(spriteData) {
        this.sprites = {};
        this.currentSprite;
        this.currentFrame = 1;

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
            }
            this.sprites[state].img.src = spriteData[state].src;
        })//end for
    }
}
