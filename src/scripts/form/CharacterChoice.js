import { CHARACTER_CHOICES } from "../../assets/data/choiceData.js";

export class CharacterChoice {
    constructor(id) {
        this.id = id;
        this.img = document.querySelector('img[alt="character-choices"]');
        this.imgRect = CHARACTER_CHOICES[id];
        this.rect = {};
    }//end ctor
    select() {
        this.selectedelected = Math.abs(this.selectedelected - 1);
    }//end select
    getCharacter() {
        return this.id;
    }//end getCharacter
    draw(ctx) {
        this.drawCharacter(ctx);
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
        ctx.restore();
    }//end drawLabel
    drawOutline(ctx, playerIdx) {
        
        ctx.save();
        let dx = this.rect.x - 5;
        let dy = this.rect.y - 5;
        let width = this.imgRect.width + 5;
        let height = this.imgRect.height + 5;

        ctx.lineWidth = 2;
        ctx.strokeStyle = (playerIdx < 1) ? "#55FF55" : "#FF0000"; // green : red
        
        //p1, green
        if (playerIdx < 1) {
            dx -= 2;
            dy -= 2;
            width += 3;
            height += 3;
        }

        ctx.beginPath();
        //move to top left
        ctx.moveTo(dx, dy);

        //draw to top right
        ctx.lineTo(dx + width, dy);

        //draw to bottom right
        ctx.lineTo(dx + width, dy + height);

        //draw to bottom left
        ctx.lineTo(dx, dy + height);

        //close the rect
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }//end drawOutline

}