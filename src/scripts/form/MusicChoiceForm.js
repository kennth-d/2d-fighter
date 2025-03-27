import { SETTINGS_CHOICES, CHOICE_PADDING, SETTINGS_CHOICE_WIDTH } from "../../assets/data/choiceData.js";
import { DEFAULT_SETTINGS } from "../utils/const.js";
import { drawLabel } from "./drawLabel.js";
import { SettingsChoice } from "./SettingsChoice.js";

const NUMBER = {
    "OFF": 0,
    "ON": 1,
}
export class MusicChoiceForm {
    constructor(x, y) {
        this.id = "music";
        this.pos = {x, y};
        this.selection = DEFAULT_SETTINGS.music;
        this.choices = [
            new SettingsChoice(SETTINGS_CHOICES.OFF, "OFF"),
            new SettingsChoice(SETTINGS_CHOICES.ON, "ON"),
        ];
        //set rect properties
        for (let i=0; i < this.choices.length; i++) {
            x = this.pos.x + (i * SETTINGS_CHOICE_WIDTH) +  (i * CHOICE_PADDING);
            y = this.pos.y;
            this.choices[i].setRectProperty("x", x);
            this.choices[i].setRectProperty("y", y); 
        }//end for

        this.choices[NUMBER[this.selection]].select();
    }//ctor
    getChoices() {
        return this.choices;
    }
    draw(ctx) {
        
        drawLabel(ctx, "MUSIC", this.pos.x - 108, this.pos.y + 10);

        for (const choice of this.choices) {
            choice.draw(ctx);
        }//end for
    }//end draw
    getSelection() {
        return this.selection;
    }//end getSelection
    setSelection(newSelection) {

        //delect choice
        this.choices[NUMBER[this.selection]].deselect();

        this.selection = newSelection;
        //set seleciton
        this.choices[NUMBER[this.selection]].select();
    }//setSelection
}//end RoundChoiceForm