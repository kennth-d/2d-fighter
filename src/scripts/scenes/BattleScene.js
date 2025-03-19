import {createFighter} from "../fighters/fighters.js";
import { Stage } from "../stage/Stage.js";
import { StatusBar } from "../overlays/StatusBar.js";
import { Scene, PauseScene } from "./scenes.js";

export class BattleScene extends Scene {

    constructor(game) {
        super(game);
        this.fighters = this.getFighterEntities(this.game.fighters[0], this.game.fighters[1]);
        this.stage = new Stage();
        this.overlays = [
            this.getStatusBar(this),
        ];

        if (game.debug) {
            game.setupDebug();
        }//end if
    }
    handlePauseEvent() {
        let scene = new PauseScene(game);
        this.game.scenes.push(scene);
        this.game.numScenes++;
    }//end handlePauseEvent
    getStatusBar(scene) {
        return new StatusBar(scene);
    }//end getStatusBar
    getFighterEntities(p1, p2) {
        const fighterEntities = [
                createFighter(0, p1, 0),
                createFighter(1, p2, 0),
            ];

            fighterEntities[0].opponent = fighterEntities[1];
            fighterEntities[1].opponent = fighterEntities[0];

            return fighterEntities;
    }//end getFighterEntitiess
    update() {
        this.updateFighters();
        this.stage.update();
        this.updateOverlays();
    }//end update
    draw() {
        this.stage.draw(this.game.ctx);
        this.drawFighters(this.game.ctx);
        this.drawOverlays(this.game.ctx);
    }//end draw
    updateFighters() {
        for (const fighter of this.fighters) {
            fighter.update();
        }
    }//end updateFighters
    updateOverlays() {
        for (const overlay of this.overlays) {
            overlay.update();
        }
    }//end updateOverlays
    drawFighters(ctx) {
        for (const fighter of this.fighters) {
            fighter.draw(ctx);
        }
    }//end drawFighters
    drawOverlays(ctx) {
        for (const overlay of this.overlays) {
            overlay.draw(ctx);
        }
    }//end drawOverlays
}