import { FighterBaseClass } from "./FighterBaseClass.js";

//Fighter_001 class
export class Fighter_001 extends FighterBaseClass {
    constructor(x, y, playerId, inputComponent, stateManager, spriteManager) {
        super(x, y, playerId);

        this.stateManager = stateManager;
        this.spriteManager = spriteManager;
        this.input = inputComponent;
    }//end ctor

    update() {

        //update the fighter state
        this.stateManager.activeState.update(this.stateManager, this.input);

        //update the sprite
        this.spriteManager.update(this);
    }//end update

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, this);
    }//end draw
}//end Fighter_001

