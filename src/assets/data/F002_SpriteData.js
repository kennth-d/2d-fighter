//** All data for F002 sprites is in this file.
// default image size is 48x48.
// format:
// STATE: {
//          src: the image source
//          width: frame width
//          height: frame height
//          frames: total number of frames in the image
//          originOffset: {x:(thisWidth - 48), y:(thisHeight - 40)}
//          delay: (n) slows the animation down by n.
//          pushBox: {width, height}  Default values: {15, 30}
// */

export const F002_SpriteData = {
    IDLE: {
        src :"../src/assets/images/fighters/F002/F002 idle 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 0, y: 8},
        delay: 1.5,
    },
    BLOCK: {
        src: "../src/assets/images/fighters/F002/F002 light attack 48x48.png",
        width: 48,
        height: 48,
        frames: 1,
        originOffset: {x: 0, y: 8},
    },
    WALK_FWD: {
        src: "../src/assets/images/fighters/F002/F002 walk fwd 48x48.png",
        width: 48,
        height: 48,
        frames: 8,
        originOffset: {x: 0, y: 8},
        delay: 1.05,
    },
    WALK_BWD: {
        src: "../src/assets/images/fighters/F002/F002 walk bwd 48x48.png",
        width: 48,
        height: 48,
        frames: 8,
        originOffset: {x: 0, y: 8},
        delay: 1.05,
    },
    DASH: {
        src: "../src/assets/images/fighters/F002/F002 dash 48x48.png",
        width: 48,
        height: 48,
        frames: 9,
        originOffset: {x: 0, y: 8},
    },
    CROUCH: {
        src: "../src/assets/images/fighters/F002/F002 crouch 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 0, y: 8},
        pushBox: {width: 20, height: 20}
    },
    // CROUCH_ATTACK: {
    //     src: undefined,
    //     width: undefined,
    //     height: undefined,
    //     frames: undefined,
    // },
    LIGHT_ATTACK: {
        src: "../src/assets/images/fighters/F002/F002 light attack 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 0, y: 8},
    },
    HEAVY_ATTACK: {
        src: "../src/assets/images/fighters/F002/F002 heavy attack 64x48.png",
        width: 65,
        height: 48,
        frames: 7,
        originOffset: {x: 17, y: 8},
        delay: 2,
    },
    SP_1: {
        src: "../src/assets/images/fighters/F002/F002 special 1 96x48.png",
        width: 80,
        height: 64,
        frames: 10,
        originOffset: 18,
    },
    SP_2: {
        src: "../src/assets/images/fighters/F002/F002 special 2 48x48.png",
        width: 48,
        height: 48,
        frames: 10
    },
    JUMP: {
        src: "../src/assets/images/fighters/F002/F002 jump 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 0, y: 8},
        delay: 2,
    },
    JUMP_FWD: {
        src: "../src/assets/images/fighters/F002/F002 jump 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 0, y: 8},
        delay: 2,
    },
    JUMP_BWD: {
        src: "../src/assets/images/fighters/F002/F002 jump bwd 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 0, y: 8},
        delay: 2,
    },
    HURT: {
        src: "../src/assets/images/fighters/F002/F002 hurt 48x48.png",
        width: 48,
        height: 48,
        frames: 4,
        originOffset: {x: 0, y: 8},
    },
    KNOCKBACK: {
        src: "../src/assets/images/fighters/F002/F002 knockback 48x48.png",
        width: 48,
        height: 48,
        frames: 7,
        originOffset: {x: 0, y: 8},
    },
    DEATH: {
        src: "../src/assets/images/fighters/F002/F002 death 64x64.png",
        width: 64,
        height: 64,
        frames: 10
    },
}//end F_001 