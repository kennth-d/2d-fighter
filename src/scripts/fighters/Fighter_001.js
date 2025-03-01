import { FighterBaseClass } from "./FighterBaseClass.js";
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
        
        //update origin points
        let offset = this.spriteManager.currentSprite.originOffset;
        this.origin.x =  this.pos.x + ((this.spriteManager.currentSprite.img.width - offset) / 2);
        this.origin.y = this.pos.y + (this.spriteManager.currentSprite.img.height - 8);
        
        //update the fighter state
        this.stateManager.activeState.update(this.stateManager, this.input);

        //update the sprite
        this.spriteManager.update(this);
    }//end update

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, this);
    }//end draw
}//end Fighter_001

