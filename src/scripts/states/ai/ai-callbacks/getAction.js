import { getWeightedRandom } from "../../../utils/AiUtils.js";
import { getSituationKey } from "./getSituationKey.js";
import { situationHandlers } from "./situationHandlers.js";

/** Tries to determine an action based on a provided context.
 * @param {context} context 
 * @returns {String} String of the AiState
 */
export function getAction(context) {
    const situation = getSituationKey(context);
    const handler = situationHandlers[situation] || situationHandlers.DEFAULT;
    const decisions = handler(context);
    return getWeightedRandom(decisions);
}
