import { Choice } from "./Choice.js";
import * as choiceData from "../../assets/data/choiceData.js"

export class SettingsChoice extends Choice {
    constructor(choice, id) {
        super(choice, id);
        this.currentState;
        this.rect = {x: 0, y: 0, width: choiceData.SETTINGS_CHOICE_WIDTH, height: choiceData.SETTINGS_CHOICE_HEIGHT};
        this.currentState = this.choice.BASE;
    }//end ctor
    draw(ctx) {
        const {x: sX, y: sY, width: w, height: h } = this.currentState;
        const { x: dx, y: dy } = this.rect;

        ctx.drawImage(
            this.img,
            sX, sY, w, h,
            dx, dy,
            w, h
        )//end drawImage
    }//end draw
    setRectProperty(property, value) {
        this.rect[property] = value;
    }//end setRectProperty
}//end Choice class