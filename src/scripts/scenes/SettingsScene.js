import { Button } from "../form/Button.js";
import { BUTTON_PADDING, BUTTON_WIDTH, BUTTONS } from "../../assets/data/buttonsData.js";
import { RoundChoiceForm } from "../form/RoundChoiceForm.js";
import { getClickedObject } from "../utils/getClickedObject.js";
import { MenuScene } from "./scenes.js";
import { MusicChoiceForm } from "../form/MusicChoiceForm.js";
import { RangeInput } from "../form/RangeInput.js";
import { MENU } from "../utils/const.js";

export class SettingsScene extends MenuScene {
    constructor(game) {
        super(game)
        this.buttons = this.getButtons();
        this.settingsChoices = [
            new RoundChoiceForm(497, MENU.centerY - 200),
            new MusicChoiceForm(586, MENU.centerY + 25),
        ];
        this.rangeSettings = [
            new RangeInput(540, MENU.centerY - 100, 200, 20, 30, 180, game.gameSettings.roundDuration, "ROUND_LENGTH"),
            new RangeInput(540, MENU.centerY - 25, 200, 20, 0, 100, game.gameSettings.volume, "VOLUME"),
        ];
        this.mouseDown = 0;
    }//end ctor
    handleClickEvent(event) {
        if (event.which === 3) return;
        //handle choices
        for (let i = 0; i < this.settingsChoices.length; i++) {
            let clicked = getClickedObject(this.settingsChoices[i].getChoices(), this.mousePos);
            if (clicked) {
                this.settingsChoices[i].setSelection(clicked.id);
            }
        }//end for

        //handle buttons
        super.handleClickEvent(event);
    }//end handleClickEvent
    handleMouseMove(event) {
        super.handleMouseMove(event);

        if (!this.mouseDown) return;
        let mouseDownOnRange = getClickedObject(this.rangeSettings, this.mousePos);

        //if mouse is down on range control update and redraw.
        if (mouseDownOnRange) {
            mouseDownOnRange.setValue(mouseDownOnRange.getValueFromMouse(this.mousePos));
            this.draw();
        }//end if
    }
    handleMouseDown() {
        this.mouseDown++;
    }
    handleMouseUp() {
        this.mouseDown--;
    }
    draw() {
        this.drawbg(this.game.ctxHigh);
        this.drawButtons(this.game.ctxHigh);
        this.drawChoices(this.game.ctxHigh);
        this.drawRanges(this.game.ctxHigh);
    }//end draw
    drawButtons(ctx) {
        for (const button of this.buttons) {
            button.draw(ctx);
        }//end for
        ctx.restore();
    }//end draw buttons
    drawChoices(ctx) {
        for (const setting of this.settingsChoices) {
            setting.draw(ctx);
        }//end for
    }//end drawChoices
    drawRanges(ctx) {
        for (const rangeControl of this.rangeSettings) {
            rangeControl.draw(ctx);
        }//end drawranges
    }//end drawRanges
    getButtons() {
        let returnBtn = new Button(BUTTONS.RETURN, "RETURN");
        returnBtn.setRectProperty("x", MENU.centerX + BUTTON_PADDING);
        returnBtn.setRectProperty("y",  MENU.centerY + 125);

        let confirmBtn = new Button(BUTTONS.CONFIRM, "CONFIRM");
        confirmBtn.setRectProperty("x", MENU.centerX - BUTTON_WIDTH - BUTTON_PADDING);
        confirmBtn.setRectProperty("y",  MENU.centerY + 125);
        return [returnBtn, confirmBtn];
    }//end getButtons
    drawbg(ctx) {
        ctx.fillStyle = "#4e4e4e";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "red";
        ctx.font = "bold 28px Helvetica";
        let text = "Settings";
        let metrics = ctx.measureText(text);
        let dx = ctx.canvas.width/2 - metrics.width/2;
        let dy = MENU.centerY - 250;
        ctx.fillText(text, dx, dy);
    }//end draw
}//end SettingsScene