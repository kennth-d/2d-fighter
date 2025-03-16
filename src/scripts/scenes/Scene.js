//base Scene class
export class Scene {
    constructor(game) {
        this.game = game;
        this.mousePos = {x: 0, y: 0};
    }
    update() {
        for (const button of this.buttons) {
            let state = BUTTON_STATES[Number(isInside(button.rect, this.mousePos))];
            button.update(state);
        }//end for
    }
    draw() {
        throw new Error("draw method not implemented.");
    }
    handleClickEvent() {
        return;
    }
}//end scene