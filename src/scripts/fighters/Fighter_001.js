import { FighterBaseClass } from "./FighterBaseClass.js";
import { correctDirection } from "../utils/utils.js";
import { resolveCollision } from "../utils/collision.js";
//Fighter_001 class
export class Fighter_001 extends FighterBaseClass {
    constructor(x, y, playerId, inputComponent, stateManager, spriteManager) {
        super(x, y, playerId);

        this.opponent = undefined;
        this.stateManager = stateManager;
        this.spriteManager = spriteManager;
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

        //check and resolve collisions
        resolveCollision(this);

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
        this.origin.x =  this.pos.x + ((this.spriteManager.currentSprite.img.width - offsetX) / 2);
        this.origin.y = this.pos.y + (this.spriteManager.currentSprite.img.height - offsetY);
    }
    updatePushbox() {
        let spriteWidth = this.spriteManager.currentSprite.pushBox.width;
        let spriteHeight = this.spriteManager.currentSprite.pushBox.height;
        this.pushBox.x = this.origin.x - (spriteWidth/2);
        this.pushBox.y = this.origin.y - spriteHeight;
        this.pushBox.width = spriteWidth;
        this.pushBox.height = spriteHeight;
    }
}//end Fighter_001

