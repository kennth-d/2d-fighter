import { FighterBaseClass } from "./FighterBaseClass.js";
import { FighterStateManager } from "../components/FighterStateManager.js";
import { FighterSpriteManager } from "../components/SpriteManager.js";
import { F002_SpriteData } from "../../assets/data/F002_SpriteData.js";
import { AiStateManager } from "../components/AIStateManager.js";

//Fighter_001 class
export class Fighter_002 extends FighterBaseClass {
    constructor(x, y, playerId, inputComponent, ai) {
        super(x, y, playerId);
        this.name = "F002";
        this.opponent = undefined;
        this.stateManager = new FighterStateManager(this);
        this.spriteManager = new FighterSpriteManager(F002_SpriteData);
        this.input = inputComponent;
        this.input.id = playerId;
        if (ai) this.ai = new AiStateManager(this);
    }//end ctor
}//end Fighter_001

