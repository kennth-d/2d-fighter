//** All data for F001 sprites is in this file.
// format:
// STATE: {
//          src: the image source
//          width: frame width
//          height: frame height
//          frames: total number of frames in the image
//          originOffset: used to center the image on the canvas context.
//          delay: (n) slows the animation down by a factor of n.
// */

const path = "../src/assets/images/fighters/F001/F001 ";

export const F001_SpriteData = {
    IDLE: {
        src : path + "idle 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 24, y: 40},
    },
    BLOCK: {
        src: path + "idle 48x48.png",
        width: 48,
        height: 48,
        frames: 1,
        originOffset: {x: 24, y: 40},
    },
    WALK_FWD: {
        src: path + "walk fwd 48x48.png",
        width: 48,
        height: 48,
        frames: 8,
        originOffset: {x: 24, y: 40},
        delay: 1.05,

    },
    WALK_BWD: {
        src: path + "walk bwd 48x48.png",
        width: 48,
        height: 48,
        frames: 8,
        originOffset: {x: 24, y: 40},
        delay: 1.05,
    },
    CROUCH: {
        src: path + "crouch 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 24, y: 40},
    },

    LIGHT_ATTACK: {
        src: path + "light attack 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 22, y: 40},
    },
    HEAVY_ATTACK: {
        src: path + "heavy attack 64x48.png",
        width: 65,
        height: 48,
        frames: 7,
        originOffset: {x: 24, y: 40},
        delay: 2,
    },
    SP_1: {
        src: path + "special 1 80x48.png",
        width: 80,
        height: 64,
        frames: 10,
        originOffset: {x: 37, y: 40},
        delay: 2,
    },
    SP_2: {
        src: path + "special 2 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 23, y: 40},
        delay: 1.5,
    },
    JUMP: {
        src: path + "jump 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 21, y: 40},
        delay: 2,
    },
    JUMP_FWD: {
        src: path + "jump 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 21, y: 40},
        delay: 1.5,
    },
    JUMP_BWD: {
        src: path + "jump bwd 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 27, y: 40},
        delay: 2,
    },
    HURT: {
        src: path + "hurt 48x48.png",
        width: 48,
        height: 48,
        originOffset: {x: 22, y: 40},
        frames: 4,
    },
    KNOCKBACK: {
        src: path + "knockback 48x48.png",
        width: 48,
        height: 48,
        frames: 7,
        originOffset: {x: 24, y: 40},
    },
    KO: {
        src: path + "death 48x48.png",
        width: 64,
        height: 64,
        frames: 10,
        originOffset: {x: 24, y: 40},
    },
}//end F_001 