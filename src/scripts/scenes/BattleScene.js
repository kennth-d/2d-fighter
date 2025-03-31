import {createFighter} from "../fighters/fighters.js";
import { Stage } from "../stage/Stage.js";
import { StatusBar } from "../overlays/StatusBar.js";
import { Scene, PauseScene } from "./scenes.js";
import * as collisionManager from "../utils/collision.js";
import { TIME } from "../utils/const.js";

export class BattleScene extends Scene {

    constructor(game) {
        super(game);
        this.fighters = this.getFighterEntities(this.game.fighters[0], this.game.fighters[1]);
        this.stage = new Stage();
        this.drawOrder = [0, 1];
        this.overlays = [
            this.getStatusBar(this),
        ];

        if (game.debug) {
            game.setupDebug();
        }//end if
    }//end ctor
    handlePauseEvent() {
        let scene = new PauseScene(this.game);
        this.game.scenes.push(scene);
        this.game.numScenes++;
        this.game.scene = this.game.scenes[this.game.numScenes-1];
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
        //console.log(TIME.previous, TIME.hitStopTimer);
        this.updateFighters();
        this.stage.update();
        this.updateOverlays();

        collisionManager.resolvePushBoxCollision(this.fighters);
        
        collisionManager.ensureOnScreen(this.fighters[0]);
        collisionManager.ensureOnScreen(this.fighters[1]);

        //check for attack collision
        //TODO: refactor updateHitBoxCollision to resolve hits in one call.
        collisionManager.updateHitBoxCollision(this, this.fighters[0], this.fighters[1]);
        collisionManager.updateHitBoxCollision(this, this.fighters[1], this.fighters[0]);
    }//end update
    draw() {
        this.stage.draw(this.game.ctx);
        this.drawFighters(this.game.ctx);
        this.drawOverlays(this.game.ctx);
    }//end draw
    updateFighters() {
        for (const fighter of this.fighters) {
            if (TIME.previous < TIME.hitStopTimer) {
                console.log("hitStop");
                return;
            } 
            fighter.update();
        }
    }//end updateFighters
    updateOverlays() {
        for (const overlay of this.overlays) {
            overlay.update();
        }
    }//end updateOverlays
    drawFighters(ctx) {
        for (const num of this.drawOrder) {
            this.fighters[num].draw(ctx);
        }
    }//end drawFighters
    drawOverlays(ctx) {
        for (const overlay of this.overlays) {
            overlay.draw(ctx);
        }
    }//end drawOverlays
}