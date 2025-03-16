import { BUTTON_HEIGHT, BUTTON_WIDTH } from "../../assets/data/buttonsData.js";

export const BUTTON_STATES = {
    0: "BASE",
    1: "HOVER",
}

// reusable button component
// can be drawn directly on canvas element.
// uses a button decal in the form of .png file
// callbacks are defined in ButtonCallbacks.js
export class Button {
    constructor(button, id) {
        this.img = document.querySelector('img[alt="buttons"]');
        this.id = id;
        this.button = button;
        this.currentState = this.button.BASE;
        this.rect = {x:0, y:0, width: BUTTON_WIDTH, height: BUTTON_HEIGHT};
    }//end ctor
    update(state) {
        this.currentState = this.button[state];
    }
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
}//end cls button
