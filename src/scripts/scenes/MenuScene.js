import { Scene } from "./Scene.js"
import { HoverStatus } from "../form/Button.js";
import { isInside } from "../utils/mouseHandler.js";
import { getClickedObject } from "../utils/getClickedObject.js";
import { BUTTON_CALLBACKS } from "../form/ButtonCallbacks.js";
import { getMousePos } from "../utils/mouseHandler.js";

export class MenuScene extends Scene {
    constructor(game) {
        super(game);
        this.buttons;
    }//end ctor
    update() {
        for (const button of this.buttons) {
            let state = HoverStatus[Number(isInside(button.rect, this.mousePos))];
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
    handleClickEvent(event) {
        if (event.which === 3) return;
        let clickedBtn = getClickedObject(this.buttons, this.mousePos);
        if (clickedBtn) BUTTON_CALLBACKS[clickedBtn.id](this.game);
    }
    handleMouseMove(event) {
        let mPos = getMousePos(this.game.ctxHigh.canvas, event);
        this.mousePos.x = mPos.x;
        this.mousePos.y = mPos.y;
    }//end handleMouseMove

}//end MenuScene cls
    