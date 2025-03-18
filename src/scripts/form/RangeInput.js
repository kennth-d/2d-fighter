import { SETTINGS_LABEL_DATA } from "../../assets/data/labelData.js";
import { drawLabel } from "./drawLabel.js";

// https://stackoverflow.com/questions/39628400/range-input-on-canvas
export class RangeInput {
    constructor(x, y, width, height, min, max, initialValue, label, id) {
        this.slider = {x, y, width, height};
        this.rect = {x:this.slider.x-5, y: this.slider.y-10, width:this.slider.width+10, height: this.slider.height+10};
        this.min = min;
        this.max = max;
        this.label = label;
        this.value = initialValue;
        this.valueLabel;
        this.percent = 0;
        this.mouseDown = 0;
    }
    getValue() {
        return this.value;
    }
    setValue(newValue) {
        this.value = newValue;
    }
    draw(ctx) {
        this.drawBar(ctx);
        this.drawThumb(ctx);
        this.drawLabels(ctx);
    }
    drawBar(ctx) {
        ctx.save();
 
        ctx.lineWidth = 8;
        ctx.lineCap = "round";

        //draw the horizontal bar
        ctx.beginPath();
        ctx.moveTo(this.slider.x, this.slider.y);
        ctx.lineTo(this.slider.x + this.slider.width, this.slider.y);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();
    }//end drawBar
    drawThumb(ctx) {
        ctx.save();
        
        ctx.lineWidth = 6;
        this.percent = (this.value - this.min) / (this.max - this.min);

        let thumbX = this.slider.x + this.slider.width * this.percent;

        //draw the vertical bar
        ctx.beginPath();
        ctx.moveTo(thumbX, this.slider.y - this.slider.height/2);
        ctx.lineTo(thumbX, this.slider.y + this.slider.height/2);
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.restore();
    }//drawThumb
    drawLabels(ctx) {
        ctx.save();
        drawLabel(ctx, this.label, this.slider.x - SETTINGS_LABEL_DATA[this.label].width - 50, this.slider.y-15);
        //draw value
        ctx.font = "24px black";
        ctx.fillStyle = "black";
        let textValue = this.value.toString();
        if (this.label === "ROUND_LENGTH") textValue += "s";
        if (this.label === "VOLUME") textValue += "%";
        ctx.fillText(textValue, this.slider.x + this.slider.width + 20, this.slider.y+7);
        ctx.restore();
    }//end drawLabels
    getValueFromMouse(mouse) {
        let mousePercent = Math.max(0, Math.min(1, (mouse.x - this.slider.x) / this.slider.width));
        let newValue = Math.round(this.min + (mousePercent * (this.max - this.min)));
        this.setValue(newValue);
        return newValue;
    }//end getValueFromMouse
}