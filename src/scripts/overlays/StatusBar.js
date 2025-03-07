import {CANVAS_WIDTH, DPR, SETTINGS } from "../utils/global.js";
import { STATUS } from "../../assets/data/StatusBarData.js"

export class StatusBar {

    constructor(fighters) {
        this.fighters = fighters
        this.timer = SETTINGS.roundTime;
        this.delayTimer = 0;
        this.rounds = new Array(SETTINGS.rounds);
        this.health;
        this.energy;
        this.clock;
        this.round;

        this.setup();    
    }//end ctor
    setup() {
        //create the images for health/stamina
        this.health = {
            background: new Image(STATUS.HEALTH.WIDTH, STATUS.HEALTH.HEIGHT),
            overlay: new Image(STATUS.HEALTH.WIDTH, STATUS.HEALTH.HEIGHT),
            dx: 45,
            dy: 5,
        },
        this.energy = {
            background: new Image(STATUS.ENERGY.WIDTH, STATUS.ENERGY.HEIGHT),
            overlay: new Image(STATUS.ENERGY.WIDTH, STATUS.ENERGY.HEIGHT),
            dx: 45,
            dy: 24,
        }
        this.clock = {
            background: new Image(STATUS.CLOCK.WIDTH, STATUS.CLOCK.HEIGHT),
            dx: CANVAS_WIDTH/2 - STATUS.CLOCK.WIDTH/2,
            dy: 5,
        }
        this.round = {
            background: new Image(STATUS.ROUND.WIDTH, STATUS.ROUND.HEIGHT),
            win: new Image(STATUS.ROUND.WIDTH, STATUS.ROUND.HEIGHT),
            lose: new Image(STATUS.ROUND.WIDTH, STATUS.ROUND.HEIGHT),
            dx: CANVAS_WIDTH/2 - (this.rounds.length * STATUS.ROUND.WIDTH)/2,
            dy: 30,
        }

        //bind the health and stamina images to their source.
        this.health.background.src = STATUS.HEALTH.BACKGROUND;
        this.health.overlay.src = STATUS.HEALTH.OVERLAY;

        this.energy.background.src = STATUS.ENERGY.BACKGROUND;
        this.energy.overlay.src = STATUS.ENERGY.OVERLAY;

        this.clock.background.src = STATUS.CLOCK.BACKGROUND;
        //add font to the document
        document.fonts.add(STATUS.CLOCK.FONT);

        this.round.background.src = STATUS.ROUND.BACKGROUND;
        this.round.win.src = STATUS.ROUND.WIN;
        this.round.lose.src = STATUS.ROUND.LOSE;

        
        console.log(this);
    }//end setup
    update() {
        return;
    }
    draw(ctx) {
        //draw health
        this.drawElement(ctx, this.health, 1);
        this.drawElement(ctx, this.health, -1);

        //draw energy
        this.drawElement(ctx, this.energy, 1);
        this.drawElement(ctx, this.energy, -1);

        //draw clock
        this.drawClock(ctx);

        //draw rounds
        this.drawRounds(ctx);
    }
    drawElement(ctx, element, direction, percent = 1.0) {
        //source
        let sX = 0;
        let sY = 0;
        let width = element.background.width;
        let height = element.background.height;
        let dX = element.dx;
        let dY = element.dy;

        ctx.scale(direction, 1);

        //needed to offset mirroring
        if (direction < 0) {
            dX = CANVAS_WIDTH - element.dx;
        }

        //draw background
        ctx.drawImage(
            element.background,
            sX, sY,
            width, height,
            dX * direction, dY,
            width, height
        )//end draw background

        //draw overlay
        ctx.drawImage(
            element.overlay,
            sX, sY,
            width, height,
            dX * direction, dY,
            width * percent, height
        )//end draw overlay
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }//end drawElement
    drawClock(ctx) {
        let sX = 0;
        let sY = 0;
        let width = this.clock.background.width;
        let height = this.clock.background.height;
        let dX = this.clock.dx;
        let dY = this.clock.dy;
        
        //draw backgound
        ctx.drawImage(
            this.clock.background,
            sX, sY,
            width, height,
            dX, dY,
            width, height
        )//end draw overlay

        //draw overlay
        ctx.scale(DPR, DPR);
        ctx.font = "200 14px RobotoFlex-Regular";
        ctx.texAlign = "center";
        ctx.baseline = "middle";
        ctx.fillStyle = "white";
        let textDx = CANVAS_WIDTH/2 - 49.5
        let textDy = this.clock.dy + 13;   // +10 needed to center text.
        ctx.fillText(this.timer, textDx, textDy);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    drawRounds(ctx) {
        let sX = 0;
        let sY = 0;
        let width = this.round.background.width;
        let height = this.round.background.height;
        let dX = this.round.dx;
        let dY = this.round.dy;

        for (let i = 0; i < this.rounds.length; i++) {
            //draw round winner
            if (this.rounds[i] === 1) {
                //win
                ctx.drawImage(
                    this.round.win,
                    sX, sY,
                    width, height,
                    dX + (i * width), dY,
                    width, height
                );
            } else if (this.rounds[i] === -1) {
                //lose
                ctx.drawImage(
                    this.round.lose,
                    sX, sY,
                    width, height,
                    dX + (i * width), dY,
                    width, height
                );
            } else {
                //neutral
                ctx.drawImage(
                    this.round.background,
                    sX, sY,
                    width, height,
                    dX + (i * width), dY,
                    width, height
                );//end draw overlay
            }//end if-elif-else
        }//end for
    }//end drawRounds
    setTimer(duration) {
        this.timer = duration;
    }//end setTimer
    reset() {
        this.timer = StatusBar.DEFAULT_TIMER;
        this.rounds = []
    }
}//end cls StatusBar