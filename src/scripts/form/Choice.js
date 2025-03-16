export class Choice {
    constructor(choice, id) {
        this.img = document.querySelector('img[alt="choices"]');
        this.choice = choice;
        this.id = id;
        this.currentState;
        this.rect;
    }//end ctor
    select() {
        this.currentState = this.choice.SELECTED;
    }
    deselect() {
        this.currentState = this.choice.BASE;
    }
    draw() {
        throw new Error("draw method not implemented.");
    }//end draw

}//end Choice class