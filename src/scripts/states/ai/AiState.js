/**
 * AiState base class for all states.
 */
export class AiState {
    constructor(stateName) {
        this.name = stateName;
    }//end
    enter() {}
    update() {}
    exit() {}
}