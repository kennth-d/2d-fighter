import { Button } from "../form/Button.js";
import { BUTTON_HEIGHT, BUTTON_PADDING, BUTTON_WIDTH, BUTTONS } from "../../assets/data/buttonsData.js";
import { MenuScene } from "./scenes.js";
import { CharacterChoice } from "../form/CharacterChoice.js";
import { getClickedObject } from "../utils/getClickedObject.js";


export class CharacterSelectScene extends MenuScene {
    constructor(game) {
        super(game);
        this.buttons = [new Button(BUTTONS.RETURN, "RETURN"), new Button(BUTTONS.BATTLE, "BATTLE")];
        this.characterChoices = [new CharacterChoice("F001"), new CharacterChoice("F002")];
        this.selectedCharacters = [];

        //set button position
        this.setButtons();
        

        //set character positions
        this.setCharRects();

    }
    handleClickEvent() {
        let clicked = getClickedObject(this.characterChoices, this.mousePos);
        let idx = this.selectedCharacters.indexOf(clicked);
        
        if (clicked && idx > -1) {
            this.removeSelectedCharacter(clicked, idx);
        } else if (clicked) {
            this.addSelectedCharacter(clicked);
        }//end if-else
        console.log(this.selectedCharacters);
        super.handleClickEvent();
    }//end handleClickEvent
    draw() {
        this.drawbg(this.game.ctxHigh);
        this.drawCharacterChoices(this.game.ctxHigh);
        this.drawLegend(this.game.ctxHigh);
        super.draw(this.game.ctxHigh);
    }//end draw
    drawCharacterChoices(ctx) {
        for (let i = 0; i < this.characterChoices.length; i++) {
            this.characterChoices[i].draw(ctx, this.selectedCharacters.indexOf(this.characterChoices[i]));
        };
    }//end drawCharacterChoices
    drawbg(ctx) {
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "red";
        ctx.font = "bold 28px Helvetica";
        let text = "Character Select";
        let metrics = ctx.measureText(text);
        let dx = ctx.canvas.width/2 - metrics.width/2;
        let dy = ctx.canvas.height/2 - 200;
        ctx.fillText(text, dx, dy);
    }//end draw
    drawLegend(ctx) {
        ctx.save();
        let dx = 100;
        let dy1 = 200;
        let dy2 = 250;

        //draw txt info
        ctx.font = "bold 24px Helvetica";
        ctx.fillStyle = "black";
        let textMetric = ctx.measureText("Player X   ");

        ctx.fillText("Player 1", dx, dy1);
        ctx.fillText("Player 2", dx, dy2);

        //draw player one square
        ctx.fillStyle = "green";
        ctx.fillRect(dx + textMetric.width, dy1-20, 25,25);

        //draw player two square
        ctx.fillStyle = "red";
        ctx.fillRect(dx + textMetric.width, dy2-20, 25, 25);

        ctx.restore();
    }
    setButtons() {
        this.buttons[0].rect.x = this.game.ctxHigh.canvas.width - BUTTON_WIDTH - 50;
        this.buttons[0].rect.y = 130;

        this.buttons[1].rect.x = this.game.ctxHigh.canvas.width/2 - BUTTON_WIDTH/2;
        this.buttons[1].rect.y = this.game.ctxHigh.canvas.height - 100;
    }
    setCharRects() {
        let center = { x: this.game.ctxHigh.canvas.width/2, y: this.game.ctxHigh.canvas.height/2 };
        let imgWidth = this.characterChoices[0].imgRect.width;
        let imgHeight = this.characterChoices[0].imgRect.height;

        for (let i = 0; i < this.characterChoices.length; i++) {
            this.characterChoices[i].rect = {
                x: center.x - imgWidth/2,
                y: center.y-100, 
                width: imgWidth, 
                height: imgHeight
            };
        }//end for
        this.characterChoices[0].rect.x -= 100;
        this.characterChoices[1].rect.x += 100;
    }//end setCharRects
    addSelectedCharacter(char) {
        if (this.selectedCharacters.length === 2) return;

        this.selectedCharacters.push(char);
        char.select();
    }
    removeSelectedCharacter(char, idx) {
        if (idx === 0) this.selectedCharacters.shift();
        if (idx === 1) this.selectedCharacters.pop();
        char.select();
    }
}