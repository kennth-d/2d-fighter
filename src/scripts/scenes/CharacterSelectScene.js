import { Button } from "../form/Button.js";
import { BUTTON_PADDING, BUTTON_WIDTH, BUTTONS } from "../../assets/data/buttonsData.js";
import { MenuScene } from "./scenes.js";
import { CharacterChoice } from "../form/CharacterChoice.js";
import { getClickedObject } from "../utils/getClickedObject.js";
import { MENU } from "../utils/const.js";


export class CharacterSelectScene extends MenuScene {
    constructor(game) {
        super(game);
        this.buttons = [new Button(BUTTONS.RETURN, "RETURN"), new Button(BUTTONS.BATTLE, "BATTLE")];
        this.characterChoices = [new CharacterChoice("F001"), new CharacterChoice("F002")];
        this.selectedCharacters = [];
        //set button position
        this.setButtons();
        
        //set character image positions
        this.setCharRects();
    }
    handleClickEvent(event) {
        let clicked = getClickedObject(this.characterChoices, this.mousePos);
        let idx = this.selectedCharacters.indexOf(clicked);

        //handle left mouse click
        if (event.which === 1) {
            if (clicked && this.selectedCharacters.length < 2) {
                this.addSelectedCharacter(clicked);
            }
        }//end handle left mouse click

        //handle right mouse click
        if (event.which === 3) {
            if (clicked) {
                this.removeSelectedCharacter(idx);
            }
        }//end handle right mouse click   
        
        super.handleClickEvent(event); //handle button clicks
    }//end handleClickEvent
    draw() {
        this.drawbg(this.game.ctxHigh);
        this.drawCharacterChoices(this.game.ctxHigh);
        this.drawLegend(this.game.ctxHigh);
        super.draw(this.game.ctxHigh);
    }//end draw
    drawCharacterChoices(ctx) {
        for (let i = 0; i < this.characterChoices.length; i++) {
            this.characterChoices[i].draw(ctx);
            const selection = this.selectedCharacters.at(i);
            if (selection != undefined) {
                selection.drawOutline(ctx, i);
            }//end if
        };
    }//end drawCharacterChoices
    drawbg(ctx) {
        ctx.fillStyle = "#4e4e4e";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "red";
        ctx.font = "bold 28px Helvetica";
        let text = "Character Select";
        let metrics = ctx.measureText(text);
        let dx = MENU.centerX - metrics.width/2;
        let dy = MENU.centerY - 250;
        ctx.fillText(text, dx, dy);
    }//end draw
    drawLegend(ctx) {
        ctx.save();
        let dx = MENU.centerX - MENU.centerX * .85;
        let dy1 = MENU.centerY - 175;
        let dy2 = dy1 + 50;
        let dy3 = dy2 + 50;
        let dy4 = dy3 + 50;

        //draw txt info
        ctx.font = "bold 24px Helvetica";
        ctx.fillStyle = "black";
        let textMetric = ctx.measureText("Player X   ");

        ctx.fillText("Player 1", dx, dy1);
        ctx.fillText("Player 2", dx, dy2);
        ctx.fillText("Select: LMB", dx, dy3);
        ctx.fillText("Deselect: RMB", dx, dy4);

        //draw player one square
        ctx.fillStyle = "#55FF55";
        ctx.fillRect(dx + textMetric.width, dy1-20, 25,25);

        //draw player two square
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(dx + textMetric.width, dy2-20, 25, 25);

        ctx.restore();
    }
    setButtons() {
        this.buttons[0].rect.x = MENU.centerX + BUTTON_PADDING;
        this.buttons[0].rect.y = MENU.centerY + 125;

        this.buttons[1].rect.x = MENU.centerX - BUTTON_WIDTH - BUTTON_PADDING;
        this.buttons[1].rect.y = MENU.centerY + 125;
    }
    setCharRects() {
        let center = { x: this.game.ctxHigh.canvas.width/2, y: this.game.ctxHigh.canvas.height/2 };
        let imgWidth = this.characterChoices[0].imgRect.width;
        let imgHeight = this.characterChoices[0].imgRect.height;

        for (let i = 0; i < this.characterChoices.length; i++) {
            this.characterChoices[i].rect = {
                x: center.x - imgWidth/2,
                y: center.y-200, 
                width: imgWidth, 
                height: imgHeight
            };
        }//end for
        this.characterChoices[0].rect.x -= 100;
        this.characterChoices[1].rect.x += 100;
    }//end setCharRects
    addSelectedCharacter(char) {
        this.selectedCharacters.push(char);
    }
    removeSelectedCharacter(idx) {
        if (idx === 0 && this.selectedCharacters[1] != undefined && this.selectedCharacters[0] != this.selectedCharacters[1]) return;
        if (idx === 0) this.selectedCharacters.shift();
        if (idx === 1) this.selectedCharacters.pop();
    }
}//end CharacterSelectScene