import { AiState } from "../states/ai/AiState.js";
import * as aiStates from "../states/AIStates.js";

export class AiStateManager {
    constructor(inputComponent, fighter) {
        this.fighter = fighter;
        this.input = inputComponent;
        this.stateStack = [new aiStates.OBSERVE()];
        this.lastState = this.activeState;
        this.maxStack = 10;
        this.stateTime = 0;
    }//end ctor
    update(dt) {
        this.stateStack[this.stateStack-1].update(dt);
    }//end update
    /**
     * @param {AiState} newState desired ai state to enter.
     * @param {Boolean} pop If set to true, pops a state off of the stack, pushes a
     * new state onto the stack and enters that state. If set to flase will not pop the last state.
     */
    transition(newState, pop = true) {
        let validState = aiStates[newState];
        if (!validState) throw new Error("desired state is not an AI state: ", newState);

        if (pop) this.popState();

        this.pushState(new validState());
        validState.enter();
    }//end transition
    /**
     * pushes a new state onto the stateStack
     * @param {AiState} newState desired ai state to push.
     * @throws {Error} if state stack exceeds maximum.
     */
    pushState(newState) {
        if (this.states.length > this.maxStates){
            throw new Error("State stack exceeded Maximum, lastState: ", this.lastState, this.stateStack);
        };
        this.stateStack.push(new aiStates[newState]())
    }//end pushState
    /**
     * pops a state off the stack
     * @throws {Error} Error if stateStack is empty.
     */
    popState() {
        if (this.states.length === 0) {
            throw new Error("State stack is empty, last state: ", this.lastState);
        };//end if

        this.stateStack.pop();
    }//end popState
}//end FighterStateManger.