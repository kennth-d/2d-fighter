import { FighterBaseClass } from "./FighterBaseClass.js";
import { correctDirection } from "../utils/correctDirection.js";
import { FighterStateManager } from "../components/FighterStateManager.js";
import { FighterSpriteManager } from "../components/SpriteManager.js";
import { F001_SpriteData } from "../../assets/data/F001_SpriteData.js";

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
        
        correctDirection(this, this.opponent);

        super.updateOrigin();
        
        //this.stateManager.activeState.update(this.stateManager, this.input);
        this.stateManager.update(this.input);
        
        this.physics.update();
        
        this.spriteManager.update(this);

        super.updateBoxes();

    }//end update

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, this);
    }//end draw
}//end Fighter_001

