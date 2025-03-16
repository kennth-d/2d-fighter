import { Scene } from "./Scene.js"
import { BUTTON_STATES } from "../form/Button.js";
import { isInside } from "../utils/mouseHandler.js";
import { getClickedObject } from "../utils/getClickedObject.js";
import { BUTTON_CALLBACKS } from "../form/ButtonCallbacks.js";

export class MenuScene extends Scene {
    constructor(game) {
        super(game);
        this.buttons;
    }//end ctor
    update() {
        for (const button of this.buttons) {
            let state = BUTTON_STATES[Number(isInside(button.rect, this.mousePos))];
            button.update(state);
        }//end for
    }//end update
    draw() {
        this.drawButtons(this.game.ctxHigh);
    }
    drawButtons(ctx) {
        for (const button of this.buttons) {
            button.draw(ctx);
        }//end for
    }//end drawButtons
    handleClickEvent() {
        let clickedBtn = getClickedObject(this.buttons, this.mousePos);
        if (clickedBtn) BUTTON_CALLBACKS[clickedBtn.id](this.game);
    }
}//end MenuScene cls
    