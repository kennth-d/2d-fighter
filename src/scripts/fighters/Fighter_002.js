import { FighterBaseClass } from "./FighterBaseClass.js";
import { correctDirection } from "../utils/correctDirection.js";
import { FighterStateManager } from "../components/FighterStateManager.js";
import { FighterSpriteManager } from "../components/SpriteManager.js";
import { F002_SpriteData } from "../../assets/data/F002_SpriteData.js";

//Fighter_001 class
export class Fighter_002 extends FighterBaseClass {
    constructor(x, y, playerId, inputComponent) {
        super(x, y, playerId);
        this.name = "F002";
        this.opponent = undefined;
        this.stateManager = new FighterStateManager(this);
        this.spriteManager = new FighterSpriteManager(F002_SpriteData);
        this.input = inputComponent;
        this.input.id = playerId;
    }//end ctor

    update() {
        
        //ensure player is facing the enemy
        correctDirection(this, this.opponent);

        //update origin points
        super.updateOrigin();
        
        //update the fighter state
        this.stateManager.activeState.update(this.stateManager, this.input);

        //update the sprite
        this.spriteManager.update(this);

        //update boxes
        super.updateBoxes();

    }//end update
    draw(ctx) {
        this.spriteManager.drawSprite(ctx, this);
    }//end draw
}//end Fighter_001

