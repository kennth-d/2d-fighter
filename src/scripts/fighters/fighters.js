import { KeyboardInputComponent } from "../components/KeyboardInputComponent.js";
import { PLAYER_ONE_START, PLAYER_TWO_START } from "../utils/global.js";
import { Fighter_001 } from "./Fighter_001.js";
import { Fighter_002 } from "./Fighter_002.js";

export const FighterConstructors = {
    F001: Fighter_001,
    F002: Fighter_002,
}
const figherStartPositions = {
    0: {x: PLAYER_ONE_START.x, y: PLAYER_ONE_START.y},
    1: {x: PLAYER_TWO_START.x, y: PLAYER_TWO_START.y},
}
const fighterControllers = {
    0: KeyboardInputComponent,
}
export function createFighter(playerId, fighterId, controllerId) {
    const Fighter = FighterConstructors[fighterId];
    let startPos = figherStartPositions[playerId];
    let inputComponent = fighterControllers[controllerId];
    return new Fighter(startPos.x, startPos.y, playerId, new inputComponent());
}