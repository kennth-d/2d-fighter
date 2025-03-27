import { SETTINGS_CHOICES, CHOICE_PADDING, SETTINGS_CHOICE_WIDTH } from "../../assets/data/choiceData.js";
import { DEFAULT_SETTINGS } from "../utils/const.js";
import { drawLabel } from "./drawLabel.js";
import { SettingsChoice } from "./SettingsChoice.js";

export class RoundChoiceForm {
    constructor(x, y) {
        this.id = "rounds";
        this.pos = {x, y};
        this.selection = DEFAULT_SETTINGS.rounds;
        this.choices = [
            new SettingsChoice(SETTINGS_CHOICES[1], 1),
            new SettingsChoice(SETTINGS_CHOICES[2], 2),
            new SettingsChoice(SETTINGS_CHOICES[3], 3),
            new SettingsChoice(SETTINGS_CHOICES[4], 4),
            new SettingsChoice(SETTINGS_CHOICES[5], 5),
        ];
        //set rect properties
        for (let i=0; i < this.choices.length; i++) {
            x = this.pos.x + (i * SETTINGS_CHOICE_WIDTH) +  (i * CHOICE_PADDING);
            y = this.pos.y;
            this.choices[i].setRectProperty("x", x);
            this.choices[i].setRectProperty("y", y); 
        }//end for

        this.choices[this.selection - 1].select();
    }//ctor
    getChoices() {
        return this.choices;
    }
    draw(ctx) {
        
        drawLabel(ctx, "NUMBER_OF_ROUNDS", this.pos.x - 225, this.pos.y + 10);

        for (const choice of this.choices) {
            choice.draw(ctx);
        }//end for
    }//end draw
    getSelection() {
        return this.selection;
    }//end getSelection
    setSelection(newSelection) {
        //delect choice
        this.choices[this.selection - 1].deselect();

        //set seleciton
        this.selection = newSelection;
        this.choices[this.selection - 1].select();
    }//setSelection

}//end RoundChoiceForm