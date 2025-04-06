import {createFighter} from "../fighters/fighters.js";
import { Stage } from "../stage/Stage.js";
import { StatusBar } from "../overlays/StatusBar.js";
import { Scene, PauseScene } from "./scenes.js";
import * as collisionManager from "../utils/collision.js";
import { TIME } from "../utils/const.js";
import { HitSplash } from "../overlays/HitSplash.js";
import { correctDirection } from "../utils/correctDirection.js";
import { Shadow } from "../components/Shadow.js";
import { Viewport } from "../components/Viewport.js";
import { RoundManager } from "../components/RoundManager.js";

export class BattleScene extends Scene {

    constructor(game) {
        super(game);
        this.clock = this.game.gameSettings.roundDuration;
        this.rounds = new Array(this.game.gameSettings.rounds).fill(-1);
        this.currentRound = 0;

        this.fighters = this.getFighterEntities(this.game.fighters[0], this.game.fighters[1]);
        this.viewport = new Viewport(32, 0, this.fighters);
        this.stage = new Stage();
        this.drawOrder = [0, 1];
        this.overlays = [
            this.getStatusBar(this),
        ];
        this.entities = [new Shadow(this.fighters[0]), new Shadow(this.fighters[1])];

        if (game.debug) {
            game.setupDebug();
        }//end if
        this.roundManager = new RoundManager(this);
        this.roundManager.startNewRound();
    }//end ctor
    handleEscapeKey() {
        if (this.roundManager.roundState.name != "InProgress") return;
        let scene = new PauseScene(this.game);
        this.game.scenes.push(scene);
        this.game.numScenes++;
        this.game.scene = this.game.scenes[this.game.numScenes-1];
    }//end handleEscapeKey
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
        this.updateFrame();
        this.roundManager.update(TIME.delta);
    }
    draw() {
        this.drawFrame();
        this.roundManager.draw();
        
    }
    updateFrame() {
      
        this.stage.update();
        this.viewport.update();
        this.updateFighters();
        this.updateEntities();
        this.updateProjectiles();
        this.updateOverlays();

        correctDirection(this.fighters[0], this.fighters[1]);
        
        collisionManager.resolvePushBoxCollision(this.fighters);
        
        collisionManager.ensureOnScreen(this.fighters[0], this.viewport);
        collisionManager.ensureOnScreen(this.fighters[1], this.viewport);

        //check for attack collision
        collisionManager.updateHitBoxCollision(this, this.fighters[0], this.fighters[1]);
        collisionManager.updateHitBoxCollision(this, this.fighters[1], this.fighters[0]);

        collisionManager.updateProjectileCollision(this.fighters);
    }//end update
    drawFrame() {
        this.stage.draw(this.game.ctx, this.viewport);
        this.drawEntities(this.game.ctx, this.viewport);
        this.drawFighters(this.game.ctx, this.viewport);
        this.drawOverlays(this.game.ctx);
        this.drawProjectiles(this.game.ctx, this.viewport);
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
    updateEntities() {
        for (const entity of this.entities) {
            entity.update();
        }
    }//end updateEntities
    drawFighters(ctx, viewport) {
        for (const num of this.drawOrder) {
            this.fighters[num].draw(ctx, viewport);
        }
    }//end drawFighters
    drawOverlays(ctx) {
        for (const overlay of this.overlays) {
            overlay.draw(ctx);
        }//end for
    }//end drawOverlays
    drawProjectiles(ctx, viewport) {
        for (const fighter of this.fighters) {
            if (fighter.hasProjectiles()) {
                for (const projectile of fighter.projectiles) {
                    projectile.draw(ctx, viewport);
                }//end for
            }//end if
        }//end for
    }//end drawProjectiles
    drawEntities(ctx, viewport) {
        if (!this.entities.length) return;

        for (const entity of this.entities) {
            entity.draw(ctx, viewport);
        }//end draw
    }
    addHitSplash(x, y) {
        this.entities.push(new HitSplash(x, y));
    }
    startNewRound() {
        this.clock = this.game.gameSettings.roundDuration;
        this.fighters = this.getFighterEntities(this.game.fighters[0], this.game.fighters[1]);
        this.viewport = new Viewport(32, 0, this.fighters);
        this.stage = new Stage();
        this.entities = [new Shadow(this.fighters[0]), new Shadow(this.fighters[1])];
        this.overlays = [
            this.getStatusBar(this),
        ];
        this.roundManager.startNewRound();
    }//end startNewRound
}