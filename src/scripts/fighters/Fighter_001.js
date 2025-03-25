import { FighterBaseClass } from "./FighterBaseClass.js";
import { correctDirection } from "../utils/correctDirection.js";
import { FighterStateManager } from "../components/FighterStateManager.js";
import { FighterSpriteManager } from "../components/SpriteManager.js";
import { F001_SpriteData } from "../../assets/data/F001_SpriteData.js";
import { getBoxes } from "../utils/getBoxes.js";
import { ensureOnScreen } from "../utils/collision.js";

//Fighter_001 class
export class Fighter_001 extends FighterBaseClass {
    constructor(x, y, playerId, inputComponent) {
        super(x, y, playerId);
        this.name = "F001";
        this.opponent = undefined;
        this.stateManager = new FighterStateManager(this);
        this.spriteManager = new FighterSpriteManager(F001_SpriteData);
        this.input = inputComponent;
        this.input.id = playerId;
    }//end ctor

    update() {
        
        //ensure player is facing the enemy
        correctDirection(this, this.opponent);

        //update origin points
        this.updateOrigin();
        
        //update pushBox
        this.updatePushbox();

        //ensure player cannot move off screen.
        ensureOnScreen(this);

        //update the fighter state
        this.stateManager.activeState.update(this.stateManager, this.input);

        //update the sprite
        this.spriteManager.update(this);
    }//end update

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, this);
    }//end draw

    updateOrigin() {

        let offsetX = this.spriteManager.currentSprite.originOffset.x;
        let offsetY = this.spriteManager.currentSprite.originOffset.y;

        
        this.origin.x = this.pos.x + offsetX;
        this.origin.y = this.pos.y + offsetY;
    }
    updatePushbox() {
        let currentFrame = this.spriteManager.currentFrame;
        let state = this.spriteManager.currentSprite.name;
        
        this.boxes.push = getBoxes(this.name, state, "push", currentFrame);
        this.boxes.hurt = getBoxes(this.name, state, "hurt", currentFrame);
        this.boxes.hit = getBoxes(this.name, state, "hit", currentFrame);
    }
}//end Fighter_001

