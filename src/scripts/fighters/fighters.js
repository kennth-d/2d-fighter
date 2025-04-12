import { InputComponentAI } from "../components/InputComponentAI.js";
import { KeyboardInputComponent } from "../components/KeyboardInputComponent.js";
import { START_POSITIONS } from "../utils/const.js";
import { Fighter_001 } from "./Fighter_001.js";
import { Fighter_002 } from "./Fighter_002.js";

export const FighterConstructors = {
    F001: Fighter_001,
    F002: Fighter_002,
}
const fighterStartPositions = {
    0: {x: START_POSITIONS.playerOne.x, y: START_POSITIONS.playerOne.y},
    1: {x: START_POSITIONS.playerTwo.x, y: START_POSITIONS.playerTwo.y},
}
const fighterControllers = {
    0: KeyboardInputComponent,
}
export function createFighter(playerId, fighterId, controllerId) {
    const Fighter = FighterConstructors[fighterId];
    let startPos = fighterStartPositions[playerId];
    let inputComponent = fighterControllers[controllerId];
    return new Fighter(startPos.x, startPos.y, playerId, new inputComponent());
}

export function createAIFighter(playerId, fighterId) {
    let fighterConstructor = FighterConstructors[fighterId];
    const startPos = fighterStartPositions[playerId];
    const fighter = new fighterConstructor(startPos.x, startPos.y, playerId, new InputComponentAI(), true);

    return fighter;
}