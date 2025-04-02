import {createFighter} from "../fighters/fighters.js";
import { Stage } from "../stage/Stage.js";
import { StatusBar } from "../overlays/StatusBar.js";
import { Scene, PauseScene } from "./scenes.js";
import * as collisionManager from "../utils/collision.js";
import { TIME } from "../utils/const.js";
import { HitSplash } from "../overlays/HitSplash.js";
import { correctDirection } from "../utils/correctDirection.js";

export class BattleScene extends Scene {

    constructor(game) {
        super(game);
        this.fighters = this.getFighterEntities(this.game.fighters[0], this.game.fighters[1]);
        this.stage = new Stage();
        this.drawOrder = [0, 1];
        this.overlays = [
            this.getStatusBar(this),
        ];
        //this.entities = [];

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
        this.updateProjectiles();
        this.stage.update();
        this.updateOverlays();

        correctDirection(this.fighters[0], this.fighters[1]);
        
        //this.updateEntities();
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
        this.drawProjectiles(this.game.ctx);
        this.drawOverlays(this.game.ctx);
    }//end draw
    updateFighters() {
        for (const fighter of this.fighters) {
            if (TIME.previous < TIME.hitStopTimer) {
                return;
            }//end for 
            fighter.update();
        }//end for
    }//end updateFighters
    updateProjectiles() {
        for (const fighter of this.fighters) {
            if (fighter.hasProjectiles()) {
                for (const projectile of fighter.projectiles) {
                    if (projectile.isOffScreen()) {
                        fighter.removeProjectile(projectile.projectileId);
                    } else {
                        projectile.update();
                    }//end if-else
                }//end for
            }//end if
        }//end for
    }//end updateProjectiles
    updateOverlays() {
        for (const overlay of this.overlays) {
            overlay.update();
        }
    }//end updateOverlays
    // updateEntities() {
    //     for (const entity of entities) {
    //         entity.update();
    //     }
    //}//end updateEntities
    drawFighters(ctx) {
        for (const num of this.drawOrder) {
            this.fighters[num].draw(ctx);
        }
    }//end drawFighters
    drawOverlays(ctx) {
        for (const overlay of this.overlays) {
            overlay.draw(ctx);
        }//end for
    }//end drawOverlays
    drawProjectiles(ctx) {
        for (const fighter of this.fighters) {
            if (fighter.hasProjectiles()) {
                for (const projectile of fighter.projectiles) {
                    projectile.draw(ctx);
                }//end for
            }//end if
        }//end for
    }//end drawProjectiles
    // drawEntities(ctx) {
    //     if (!this.entities.length) return;

    //     for (const entity of this.entities) {
    //         entity.draw(ctx);
    //     }//end draw
    // }
    addHitSplash(x, y) {
        this.entities.push(new HitSplash(x, y));
    }
    

}