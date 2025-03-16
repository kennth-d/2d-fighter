import { Stage } from "../stage/Stage.js";
import { Fighter_001 } from "../fighters/Fighter_001.js";
import { Fighter_002 } from "../fighters/Fighter_002.js";
import { PLAYER_ONE_START, PLAYER_TWO_START } from "../utils/global.js";
import { KeyboardInputComponent } from "../components/KeyboardInputComponent.js";
import { StatusBar } from "../overlays/StatusBar.js";

export class BattleScene {

    constructor(game) {
        this.game = game;
        this.fighters = this.getFighterEntities();
        this.stage = new Stage();
        this.overlays = [
            new StatusBar(this.fighters),
        ];
    }
    getFighterEntities() {
        const fighterEntities = [
                new Fighter_001(PLAYER_ONE_START.x, PLAYER_ONE_START.y, 0, new KeyboardInputComponent()),
                new Fighter_002(PLAYER_TWO_START.x, PLAYER_TWO_START.y, 1, new KeyboardInputComponent()),
            ]
            fighterEntities[0].opponent = fighterEntities[1];
            fighterEntities[1].opponent = fighterEntities[0];

            return fighterEntities;
    }

    update() {
        this.updateFighters();
        this.stage.update();
        this.updateOverlays();
    }

    draw() {
        this.stage.draw(this.game.ctx);
        this.drawFighters(this.game.ctx);
        this.drawOverlays(this.game.ctx);
    }

    updateFighters() {
        for (const fighter of this.fighters) {
            fighter.update();
        }
    }

    updateOverlays() {
        for (const overlay of this.overlays) {
            overlay.update();
        }
    }

    drawFighters(ctx) {
        for (const fighter of this.fighters) {
            fighter.draw(ctx);
        }
    }

    drawOverlays(ctx) {
        for (const overlay of this.overlays) {
            overlay.draw(ctx);
        }
    }
}