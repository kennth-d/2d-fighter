//** All data for F001 sprites is in this file.
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

export const F001_SpriteData = {
    IDLE: {
        src :"../src/assets/images/fighters/F001/F001 idle 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 0, y: 8},
        delay: 1.5,
    },
    BLOCK: {
        src: "../src/assets/images/fighters/F001/F001 light attack 48x48.png",
        width: 48,
        height: 48,
        frames: 1,
        originOffset: {x: 0, y: 8},
    },
    WALK_FWD: {
        src: "../src/assets/images/fighters/F001/F001 walk fwd 48x48.png",
        width: 48,
        height: 48,
        frames: 8,
        originOffset: {x: 0, y: 8},
        delay: 1.05,
    },
    WALK_BWD: {
        src: "../src/assets/images/fighters/F001/F001 walk bwd 48x48.png",
        width: 48,
        height: 48,
        frames: 8,
        originOffset: {x: 0, y: 8},
        delay: 1.05,
    },
    DASH: {
        src: "../src/assets/images/fighters/F001/F001 dash 48x48.png",
        width: 48,
        height: 48,
        frames: 9,
        originOffset: {x: 0, y: 8},
    },
    CROUCH: {
        src: "../src/assets/images/fighters/F001/F001 crouch 48x48.png",
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
        src: "../src/assets/images/fighters/F001/F001 light attack 48x48.png",
        width: 48,
        height: 48,
        frames: 10,
        originOffset: {x: 0, y: 8},
    },
    HEAVY_ATTACK: {
        src: "../src/assets/images/fighters/F001/F001 heavy attack 64x48.png",
        width: 65,
        height: 48,
        frames: 7,
        originOffset: {x: 17, y: 8},
        delay: 2,
    },
    SP_1: {
        src: "../src/assets/images/fighters/F001/F001 special 1 80x48.png",
        width: 80,
        height: 64,
        frames: 10
    },
    SP_2: {
        src: "../src/assets/images/fighters/F001/F001 special 2 48x48.png",
        width: 48,
        height: 48,
        frames: 10
    },
    JUMP: {
        src: "../src/assets/images/fighters/F001/F001 jump 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 0, y: 8},
        delay: 2,
    },
    JUMP_FWD: {
        src: "../src/assets/images/fighters/F001/F001 jump 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 0, y: 8},
        delay: 2,
    },
    JUMP_BWD: {
        src: "../src/assets/images/fighters/F001/F001 jump bwd 48x48.png",
        width: 48,
        height: 48,
        frames: 6,
        originOffset: {x: 0, y: 8},
        delay: 2,
    },
    // JUMP_ATTACK: {
    //     src: undefined,
    //     width: undefined,
    //     height: undefined,
    //     frames: undefined
    // },
    HURT: {
        src: "../src/assets/images/fighters/F001/F001 hurt 48x48.png",
        width: 48,
        height: 48,
        originOffset: {x: 0, y: 8},
        frames: 4
    },
    KNOCKBACK: {
        src: "../src/assets/images/fighters/F001/F001 knockback 48x48.png",
        width: 48,
        height: 48,
        originOffset: {x: 0, y: 8},
        frames: 7
    },
    DEATH: {
        src: "../src/assets/images/fighters/F001/F001 death 64x64.png",
        width: 64,
        height: 64,
        frames: 10
    },
}//end F_001 