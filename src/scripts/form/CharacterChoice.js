import { CHARACTER_CHOICES } from "../../assets/data/choiceData.js";

export class CharacterChoice {
    constructor(id) {
        this.id = id;
        this.img = document.querySelector('img[alt="character-choices"]');
        this.imgRect = CHARACTER_CHOICES[id];
        this.rect = {};
        this.isSelected = 0;
    }//end ctor
    select() {
        this.isSelected = Math.abs(this.isSelected - 1);
    }//end select
    getCharacter() {
        return this.id;
    }//end getCharacter
    isSelected() {
        return Boolean(this.isSelected);
    }//end isSelected
    draw(ctx, playerIdx) {
        this.drawCharacter(ctx);

        if (this.isSelected && playerIdx >= 0) {
             this.drawOutline(ctx, playerIdx);
        }//end if

        this.drawLabel(ctx);
    }//end draw
    drawCharacter(ctx) {

        ctx.drawImage(
            this.img,
            this.imgRect.x,
            this.imgRect.y,
            this.imgRect.width,
            this.imgRect.height,
            this.rect.x, this.rect.y,
            this.imgRect.width,
            this.imgRect.height,
        )//end drawImg
    }//endDrawImg
    drawLabel(ctx) {
        let textMetrics = ctx.measureText(this.id);
        let dx = this.rect.x + (this.rect.width/2) - (textMetrics.width/2);
        
        let dy = this.rect.y + this.rect.height + 30;
        ctx.fillStyle = "black";
        ctx.font = "bold 18px Helvetica";
        ctx.fillText(this.id, dx, dy);
    }//end drawLabel
    drawOutline(ctx, playerIdx) {
        ctx.save();

        let dx = this.rect.x -2;
        let dy = this.rect.y - 2;
        ctx.lineWidth = 2;
        ctx.strokeStyle = (playerIdx < 1) ? "green" : "red";

        ctx.beginPath();
        //move to top left
        ctx.moveTo(dx, dy);

        //draw to top right
        ctx.lineTo(dx + this.imgRect.width + 5, dy);

        //draw to bottom right
        ctx.lineTo(dx + this.imgRect.width + 5, dy + this.imgRect.height + 5);

        //draw to bottom left
        ctx.lineTo(dx, dy + this.imgRect.height + 2 );

        //close the rect
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }//end drawOutline

}