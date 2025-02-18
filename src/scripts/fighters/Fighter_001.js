import { FighterBaseClass } from "./FighterBaseClass.js";

const F_001 = {
    idle_src        : "../fun/assets/2D-Pixel-Art-Character-Template/Idle/Player Idle 48x48.png",
    block_src       : "../fun/assets/2D-Pixel-Art-Character-Template/Punch Jab/Player Jab 48x48.png",
    walk_f_src      : "../fun/assets/2D-Pixel-Art-Character-Template/Walk/PlayerWalk 48x48.png",
    walk_b_src      : "../fun/assets/2D-Pixel-Art-Character-Template/Walk/PlayerWalk_b 48x48.png",
    dash_src        : "../fun/assets/2D-Pixel-Art-Character-Template/Dash/dash.png",
    crouch_src      : "../fun/assets/2D-Pixel-Art-Character-Template/Crouch-Idle/Player Crouch-Idle 48x48.png",
    crouch_atk_src  : "",
    light_atk_src   : "../fun/assets/2D-Pixel-Art-Character-Template/Punch Jab/Player Jab 48x48.png",
    heavy_atk_src   : "../fun/assets/2D-Pixel-Art-Character-Template/Punch Cross/Player Punch Cross 64x64.png",
    sp_1_src        : "../fun/assets/2D-Pixel-Art-Character-Template/Katana Attack-Sheathe/player katana attack-sheathe 80x48.png",
    sp_2_src        : "../fun/assets/2D-Pixel-Art-Character-Template/Shooting (two-handed)/player shoot 2H 48x48.png",
    jump_src        : "../fun/assets/2D-Pixel-Art-Character-Template/Jump/player new jump 48x48.png",
    jump_f_src      : "../fun/assets/2D-Pixel-Art-Character-Template/Jump/player new jump 48x48.png",
    jump_b_src      : "../fun/assets/2D-Pixel-Art-Character-Template/Jump/player jump b 48x48.png",
    jump_atk_src    : "",
    hurt_src        : "../fun/assets/2D-Pixel-Art-Character-Template/Hurt-Damaged/Player Hurt 48x48.png",
    death_src       : "../fun/assets/2D-Pixel-Art-Character-Template/Death/Player Death 64x64.png",
}//end F_001 

const sprites_001 = {
    IDLE        : { src: F_001.idle_src, frames: 10, width: 48, height: 48 },
    BLOCK       : { src: F_001.block_src, frames: 1, width: 48, height: 48 },
    WALK_FWD    : { src: F_001.walk_f_src, frames: 8, width: 48, height: 48 },
    WALK_BWD    : { src: F_001.walk_b_src, frames: 8, width: 48, height: 48 },
    DASH        : { src: F_001.dash_src, frames: 9, width: 48, height: 48 },
    CROUCH      : { src: F_001.crouch_src, frames: 10, width: 48, height: 48 },
    CROUCH_ATK  : 4,
    LIGHT_ATK   : { src: F_001.light_atk_src, frames: 10, width: 48, height: 48 },
    HEAVY_ATK   : { src: F_001.heavy_atk_src, frames: 7, width: 64, height: 64 },
    SP_1        : { src: F_001.sp_1_src, frames: 10, width: 80, height: 64 },
    SP_2        : { src: F_001.sp_2_src, frames: 10, width: 48, height: 48 },
    JUMP        : { src: F_001.jump_src, frames: 6, width: 48, height: 48 },
    JUMP_FWD    : { src: F_001.jump_f_src, frames: 6, width: 48, height: 48 },
    JUMP_BWD    : { src: F_001.jump_b_src, frames: 6, width: 48, height: 48 },
    JUMP_ATK    : 12,
    HURT        : { src: F_001.hurt_src, frames: 4, width: 48, height: 48 },
    DEATH       : { src: F_001.death_src, frames: 10, width: 64, height: 64 },
}//end sprites_001

//Fighter_001 class
export class Fighter_001 extends FighterBaseClass {
    constructor(x, y, inputComponent) {
        super(x, y, inputComponent);
        this.origin = {
            x: 0,
            y: 0
        }
        this.image = new Image(sprites_001.LIGHT_ATK.width, sprites_001.LIGHT_ATK.height);
        this.image.src = sprites_001.LIGHT_ATK.src;
        this.frames = sprites_001.LIGHT_ATK.frames;
    }//end ctor

    update(time) {
        this.x += (this.velocityX) * time.delta;
        if (time.previous > this.animationTimer + 180) {
            this.animationTimer = time.previous;
            this.currentFrame = (this.currentFrame + 1) % this.frames;
        }
    }//end update

    draw(ctx) {
        //ctx.fillStyle = "grey";
        //ctx.fillRect(this.x, this.y, 48, 48);
        ctx.drawImage(this.image,
            this.currentFrame * this.image.width,     //sX
            0,                                        //sY
            this.image.width,                         //sWidth
            this.image.height,                        //sHeight
            this.x,                                   //dX
            this.y,                                   //dY
            this.image.width,                         //dWidth
            this.image.height,                        //dHeight
        );
        
        
        if (this.debug) {
            this.draw_debug(ctx);
        }//if
    }//end draw

    draw_debug(ctx) {
        this.origin.x = this.x + ( this.image.width / 2 );
        this.origin.y = this.y + (this.image.height-15);
        ctx.lineWidth = 1;
        

        //draw vertical
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.origin.x, this.origin.y-5);
        ctx.lineTo(this.origin.x, this.origin.y+5);
        ctx.stroke();

        //draw horizontal
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.origin.x-5, this.origin.y);
        ctx.lineTo(this.origin.x+5, this.origin.y);
        ctx.stroke();
    }//end debug
}

