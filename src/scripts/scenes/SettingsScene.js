import { Button, BUTTON_STATES } from "../form/Button.js";
import { BUTTON_HEIGHT, BUTTON_PADDING, BUTTON_WIDTH, BUTTONS } from "../../assets/data/buttonsData.js";
import { isInside } from "../utils/mouseHandler.js";
import { RoundChoiceForm } from "../form/RoundChoiceForm.js";
import { BUTTON_CALLBACKS } from "../form/ButtonCallbacks.js";
import { getClickedObject } from "../utils/getClickedObject.js";
import { MenuScene } from "./scenes.js";
import { MusicChoiceForm } from "../form/MusicChoiceForm.js";

export class SettingsScene extends MenuScene {
    constructor(game) {
        super(game)
        this.buttons = this.getButtons();
        this.settings = [
            new RoundChoiceForm(497, 250),
            new MusicChoiceForm(586, 500),
        ]
        this.innitSettings();
    }
    handleClickEvent() {
        for (let i = 0; i < this.settings.length; i++) {
            let clicked = getClickedObject(this.settings[i].getChoices(), this.mousePos);
            if (clicked) {
                this.settings[i].setSelection(clicked.id);
            }
        }//end for

        let clickedBtn = getClickedObject(this.buttons, this.mousePos);
        if (clickedBtn) BUTTON_CALLBACKS[clickedBtn.id](this.game);
    }//end handleClickEvent
    update() {
        for (const button of this.buttons) {
            let state = BUTTON_STATES[Number(isInside(button.rect, this.mousePos))];
            button.update(state);
        }
    }//end
    draw() {
        this.drawstub();
        this.drawButtons(this.game.ctxHigh);
    }//end draw
    drawButtons(ctx) {
        for (const button of this.buttons) {
            button.draw(ctx);
        }//end for

        for (const setting of this.settings) {
            setting.draw(ctx);
        }//end for

    }//end draw buttons
    getButtons() {
        let returnBtn = new Button(BUTTONS.RETURN, "RETURN");
        returnBtn.setRectProperty("x", this.game.ctxHigh.canvas.width/2 + BUTTON_PADDING);
        returnBtn.setRectProperty("y",  580);

        let confirmBtn = new Button(BUTTONS.CONFIRM, "CONFIRM");
        confirmBtn.setRectProperty("x", this.game.ctxHigh.canvas.width/2 - BUTTON_WIDTH - BUTTON_PADDING);
        confirmBtn.setRectProperty("y",  580);
        return [returnBtn, confirmBtn];
    }//end getButtons
    innitSettings() {
        this.settings[0].setSelection(this.game.gameSettings.rounds);
    }
    drawstub() {
        let ctx = this.game.ctxHigh;
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "red";
        ctx.font = "bold 28px Helvetica";
        let text = "Settings";
        let metrics = ctx.measureText(text);
        let dx = ctx.canvas.width/2 - metrics.width/2;
        let dy = ctx.canvas.height/2 - 200;
        ctx.fillText(text, dx, dy);

        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width/2, 0);
        ctx.lineTo(ctx.canvas.width/2, ctx.canvas.height);
        ctx.stroke();
    }//end draw
    
}