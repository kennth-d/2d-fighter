/**
 * Interface for a Fighter State.
 * A state represents an action a fighter can take.
 */
export class FighterState {

    /** Constructor for State class
     * @param {string} name should be the same as the class name 
     * @param {string} type move | attack | defend
     */
    constructor(name, type) {}//end ctor
    /**
     * a method that should be called when entering a state.
     * @param {manager} FighterStateManager
     */
    enter(manager) {}//end enter
    /**
     * A method to be called when leaving a state.
     * @param {manager} FighterStateManager 
     */
    exit(manager) {}//end exit
    /**
     * receives and responds to input.
     * @param {manager} FighterStateManger
     * @param {inputComponent} InputComponent
     */
    update(manager, inputComponent ) {
        throw new Error("update is not implemented.");
    }//end update
    /**
     * @returns {string} name of the state
     */
    getName() {
        throw new Error("getName is not implemented.");
    }//end getName
    /**
     * @returns {string} the type of state.
     */
    getType() {
        throw new Error("getType is not implemented.");
    }//end getType
}//end class State