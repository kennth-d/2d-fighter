//see boxes.js for information.

//constant hurtbox values
export const idleHurtBoxes = [[3, 29, 7, 10], [7, 21, 12, 8], [7, 12, 12, 12]];
export const walkHurtBoxes = [[3, 28, 8, 7],  [5, 20, 9, 10], [7, 9, 12, 9]];
export const crouchHurtBoxes = [[6, 20, 20, 6], [6, 13, 11, 5], [13, 8, 20, 8]];
export const jumpHurtBoxes = [[4, 30, 7, 8], [10, 21, 19, 10], [8, 10, 14, 10]];
export const hurtHurtBoxes = [[2, 29, 7, 7], [8, 21, 17, 5], [6, 15, 9, 15]];

const defaultPushBox = [7, 27, 15, 27];

export const F001 = {
    push: {
        IDLE:         new Array(10).fill([]).map(() => {return defaultPushBox}),
        BLOCK:        new Array(1).fill([]).map(() => {return defaultPushBox}),
        WALK_FWD:     new Array(10).fill([]).map(() => {return defaultPushBox}),
        WALK_BWD:     new Array(10).fill([]).map(() => {return defaultPushBox}),
        CROUCH:       [[12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20], [12, 19, 24, 20]],
        LIGHT_ATTACK: new Array(10).fill([]).map(() => {return defaultPushBox}),
        HEAVY_ATTACK: new Array(9).fill([]).map(() => {return defaultPushBox}),
        SP_1:         new Array(10).fill([]).map(() => {return defaultPushBox}),
        SP_2:         new Array(10).fill([]).map(() => {return defaultPushBox}),
        JUMP:         new Array(6).fill([]).map(() => {return defaultPushBox}),
        FALLING:      new Array(1).fill([]).map(() => {return defaultPushBox}),
        JUMP_FWD:     new Array(6).fill([]).map(() => {return defaultPushBox}),
        JUMP_BWD:     new Array(10).fill([]).map(() => {return defaultPushBox}),
        HURT:         new Array(4).fill([]).map(() => {return defaultPushBox}),
        KNOCKBACK:    new Array(10).fill([]).map(() => {return defaultPushBox}),
        KO:           [[8, 11, 15, 28], [8, 11, 15, 28], [8, 11, 15, 28], [8, 11, 15, 28], [8, 11, 15, 28], [8, 11, 15, 28], [8, 21, 26, 18], [8, 35, 28, 4], [8, 35, 28, 4], [8, 35, 28, 4]],
    },
    hit: {
        IDLE:         new Array(10).fill([]).map(() => {[]}),
        BLOCK:        new Array(1).fill([]).map(() => {[]}),
        WALK_FWD:     new Array(10).fill([]).map(() => {[]}),
        WALK_BWD:     new Array(10).fill([]).map(() => {[]}),
        CROUCH:       new Array(10).fill([]).map(() => {[]}),
        LIGHT_ATTACK: new Array(10).fill([]).map(() => {[]}),
        HEAVY_ATTACK: new Array(7).fill([]).map(() => {[]}),
        SP_1:         new Array(10).fill([]).map(() => {[]}),
        SP_2:         new Array(10).fill([]).map(() => {[]}),
        JUMP:         new Array(6).fill([]).map(() => {[]}),
        FALLING:      new Array(1).fill([]).map(() => {[]}),
        JUMP_FWD:     new Array(6).fill([]).map(() => {[]}),
        JUMP_BWD:     new Array(10).fill([]).map(() => {[]}),
        HURT:         new Array(4).fill([]).map(() => {[]}),
        KNOCKBACK:    new Array(10).fill([]).map(() => {[]}),
        KO:           new Array(10).fill([]).map(() => {[]}),
        LIGHT_ATTACK: [[], [], [], [], [-7, 20, 17, 6], [-7, 20, 17, 6], [], [], [], []],
        HEAVY_ATTACK: [[], [], [-7, 20, 25, 5], [], [], [], [], [], []],
        SP_1:         [[], [], [-10, 17, 30, 9], [15, 32, 38, 8], [], [], [-5, 30, 21, 18], [], [], []],
        SP_2:         new Array(10).fill([]).map(() => {[]}),
    },
    hurt: {
        IDLE:         new Array(10).fill([]).map(() => {return idleHurtBoxes}), 
        BLOCK:        new Array(1).fill([]).map(()  => {return idleHurtBoxes}), 
        WALK_FWD:     new Array(10).fill([]).map(() => {return walkHurtBoxes}),
        WALK_BWD:     new Array(10).fill([]).map(() => {return walkHurtBoxes}),
        CROUCH:       new Array(10).fill([]).map(() => {return crouchHurtBoxes}),
        JUMP:         new Array(6).fill([]).map(()  => {return jumpHurtBoxes}),
        JUMP_FWD:     new Array(6).fill([]).map(()  => {return jumpHurtBoxes}),
        HURT:         new Array(4).fill([]).map(()  => {return hurtHurtBoxes}),
        KNOCKBACK:    new Array(7).fill([]),  //invulnerable
        KO:           new Array(10).fill([]), //invulnerable
        LIGHT_ATTACK: [
            [[4, 29, 7, 7], [7, 20, 14, 5], [7, 14, 12, 14]],
            [[4, 29, 7, 7], [7, 20, 14, 5], [7, 14, 12, 14]],
            [[2, 28, 7, 7], [4, 20, 15, 4], [7, 15, 13, 15]],
            [[-1, 27, 7, 7], [0, 19, 15, 5], [7, 15, 13, 15]],
            [[-4, 26, 7, 7], [2, 19, 24, 4], [7, 15, 13, 15]],
            [[-4, 26, 7, 7], [2, 19, 24, 4], [7, 15, 13, 15]],
            [[-1, 27, 7, 7], [0, 19, 15, 5], [7, 15, 13, 15]],
            [[2, 28, 7, 7], [4, 20, 15, 4], [7, 15, 13, 15]],
            [[4, 29, 7, 7], [7, 20, 14, 5], [7, 14, 12, 14]],
            [[4, 29, 7, 7], [7, 20, 14, 5], [7, 14, 12, 14]],
        ],
        HEAVY_ATTACK: [
            [[7, 30, 7, 7], [11, 21, 16, 8],[12, 12, 16, 10]],
            [[-2, 29, 7, 7], [-1, 21, 7, 9], [1, 11, 10, 11]],
            [[-15, 23, 15, 7], [-7, 12, 19, 9], [-2, 10, 16, 10]],
            [[-8, 21, 14, 3], [-7, 17, 19, 7], [-2, 10, 16, 10]],
            [[-11, 25, 7, 4], [-3, 20, 17, 11], [-1, 8, 14, 8]],
            [[-2, 29, 7, 7], [-1, 21, 7, 9], [1, 11, 10, 11]],
            [[10, 27, 7, 7], [15, 17, 16, 11], [13, 6, 16, 6]],
            [[9, 28, 7, 7], [14, 17, 16, 11], [12, 12, 15, 12]],
            [[7, 30, 7, 7], [11, 21, 16, 8],[12, 12, 16, 10]],
        ],
        SP_1: [
            [[0, 28, 7,  7], [3, 20, 9, 8], [10, 11, 17, 11]],
            [[0, 28, 7,  7], [3, 20, 9, 8], [10, 11, 17, 11]],
            [[-11, 26, 7, 7], [-2, 19, 12, 7], [8, 11, 20, 11]],
            [[-11, 26, 7, 7], [-2, 19, 12, 7], [8, 11, 20, 11]],
            [[-11, 26, 7, 7], [-2, 19, 12, 7], [8, 11, 20, 11]],
            [[-11, 26, 7, 7], [-2, 19, 12, 7], [8, 11, 20, 11]],
            [[0, 28, 7,  7], [3, 20, 9, 8], [10, 11, 17, 11]],
            [[0, 28, 7,  7], [3, 20, 9, 8], [10, 11, 17, 11]],
            [[0, 28, 7,  7], [3, 20, 9, 8], [10, 11, 17, 11]],
            [[0, 28, 7,  7], [3, 20, 9, 8], [10, 11, 17, 11]],
        ],
        SP_2: new Array(10).fill([]).map(() => {return idleHurtBoxes}),
        JUMP_BWD: [
            [[6, 29, 7, 7], [12, 20, 21, 3], [4, 18, 9, 18]],
            [[20, 26, 12, 12], [7, 21, 11, 9], [-5, 23, 8, 9]],
            [[20, 26, 12, 12], [7, 21, 11, 9], [-5, 23, 8, 9]],
            [[20, 26, 12, 12], [7, 21, 11, 9], [-5, 23, 8, 9]],
            [[20, 26, 12, 12], [7, 21, 11, 9], [-5, 23, 8, 9]],
            [[6, 29, 7, 7], [20, 11, 14, 11], [7, 10, 5, 4]]
        ],
    },
};
