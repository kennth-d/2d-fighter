import {CANVAS_WIDTH, DPR, DEFAULT_SETTINGS, TIME } from "../utils/global.js";
import { STATUS } from "../../assets/data/StatusBarData.js"
import { MAX_ENERGY, MAX_HEALTH } from "../utils/battle.js";

export class StatusBar {

    constructor(fighters) {
        //player health/energy
        this.fighters = fighters;
        this.healthBars = [{hp: MAX_HEALTH, timer: 0}, {hp: MAX_HEALTH, timer: 0}];
        this.energyBars = [{ep: MAX_ENERGY, timer: 0}, {ep: MAX_ENERGY, timer: 0}];

        //round clock and counter
        this.timer = DEFAULT_SETTINGS.roundTime;
        this.timeTimer = 0;
        this.rounds = new Array(DEFAULT_SETTINGS.rounds);
        this.rounds[0] = 1;

        //Store image data
        this.health;
        this.energy;
        this.clock;
        this.round;

        this.setup();    
    }//end ctor
    
    update() {
        this.updateTime();
        this.updateBars();
    }//end updateTime

    updateTime() {
        if (TIME.previous > this.timeTimer + 1000) {
            if (this.timer > 0) this.timer -= 1;
            this.timeTimer = TIME.previous;
        }
        if (this.timer === 0) this.reset();
    }//end updateTime

    updateBars() {
        //health
        for (const index in this.healthBars) {
            if (this.healthBars[index].hp <= this.fighters[index].health) continue;
            this.healthBars[index].hp = Math.max(0, this.healthBars[index].hp - (TIME.delta * TIME.FPS))
        }

        //energy
        for (const index in this.energyBars) {
            if (this.energyBars[index].ep <= this.fighters[index].energy) continue;
            this.energyBars[index].ep = Math.max(0, this.energyBars[index].ep - TIME.delta * TIME.FPS)
        }
    }

    draw(ctx) {
        //draw health
        this.drawElement(ctx, this.health, 1, this.healthBars[0].hp/MAX_HEALTH);
        this.drawElement(ctx, this.health, -1, this.healthBars[1].hp/MAX_HEALTH);

        //draw energy
        this.drawElement(ctx, this.energy, 1, this.energyBars[0].ep/MAX_ENERGY);
        this.drawElement(ctx, this.energy, -1, this.energyBars[1].ep/MAX_ENERGY);

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
            Math.floor(dX * direction), dY,
            width, height
        )//end draw background

        //draw overlay
        ctx.drawImage(
            element.overlay,
            sX, sY,
            width, height,
            Math.floor(dX * direction), dY,
            Math.floor(width * percent), height
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

        //time
        ctx.scale(DPR, DPR);
        ctx.font = "200 14px RobotoFlex-Regular";
        ctx.texAlign = "center";
        ctx.baseline = "middle";
        ctx.fillStyle = "white";

        let stringTime = String(this.timer).padStart(3, "00");
        let textMetrics = ctx.measureText(stringTime);
        let textDx = CANVAS_WIDTH/2 - textMetrics.width * 2.35; //2.35 to account for scaling
        let textDy = this.clock.dy + 7;   // +7 needed to center text.
        
        ctx.fillText(stringTime, textDx, textDy);

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
        //reset helthbars
        this.healthBars = [{hp: MAX_HEALTH, timer: 0}, {hp: MAX_HEALTH, timer: 0}];
        this.energyBars = [{ep: MAX_ENERGY, timer: 0}, {ep: MAX_ENERGY, timer: 0}];

        //reset clock timer
        this.timer = SETTINGS.roundTime;
        this.timeTimer = 0;
        this.rounds = new Array(SETTINGS.rounds);
    }//end reset

    setup() {
        //create the images for health/stamina
        this.health = {
            background: new Image(STATUS.HEALTH.WIDTH, STATUS.HEALTH.HEIGHT),
            overlay: new Image(STATUS.HEALTH.WIDTH, STATUS.HEALTH.HEIGHT),
            dx: 45,
            dy: 35,
        };
        this.energy = {
            background: new Image(STATUS.ENERGY.WIDTH, STATUS.ENERGY.HEIGHT),
            overlay: new Image(STATUS.ENERGY.WIDTH, STATUS.ENERGY.HEIGHT),
            dx: 45,
            dy: 55,
        };
        this.clock = {
            background: new Image(STATUS.CLOCK.WIDTH, STATUS.CLOCK.HEIGHT),
            dx: CANVAS_WIDTH/2 - STATUS.CLOCK.WIDTH/2,
            dy: 35,
        };
        this.round = {
            background: new Image(STATUS.ROUND.WIDTH, STATUS.ROUND.HEIGHT),
            win: new Image(STATUS.ROUND.WIDTH, STATUS.ROUND.HEIGHT),
            lose: new Image(STATUS.ROUND.WIDTH, STATUS.ROUND.HEIGHT),
            dx: CANVAS_WIDTH/2 - (this.rounds.length * STATUS.ROUND.WIDTH)/2,
            dy: 60,
        };

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
}//end cls StatusBar