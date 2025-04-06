import { RoundState } from "./RoundState.js";

export class InProgress extends RoundState {
    constructor(manager) {
        super(manager);
        this.scene = this.manager.scene;
    }//end ctor
    enter() {
        this.scene.currentRound++;
        for ( const fighter of this.scene.fighters) {
            fighter.input.enable();
        }
    }//end enter
    update(dt) {
        this.scene.clock -= dt;
        const hpBars = this.scene.overlays[0].healthBars;
        if (this.scene.clock <= 0 || hpBars[0].hp <= 0 || hpBars[1].hp <= 0) { 
            this.manager.transition("RoundOver");
            return;
        }//end if
    }//end update
    draw() {
        return;
    }//end draw
    exit() {
        for (const fighter of this.scene.fighters) {
            fighter.input.disable();
        }
    }//end exit
}//end InProgress