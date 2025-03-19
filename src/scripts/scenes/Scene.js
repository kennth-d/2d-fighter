//base Scene class
export class Scene {
    constructor(game) {
        this.game = game;
        this.mousePos = {x: 0, y: 0};
    }
    update() {
        throw new Error("update method not implemented.");
    }
    draw() {
        throw new Error("draw method not implemented.");
    }
    handleClickEvent() {
        return;
    }
    handleMouseUp() {
        return;
    }
    handleMouseDown() {
        return;
    }
    handleMouseMove() {
        return;
    }
    handlePauseEvent() {
        return;
    }
}//end scene