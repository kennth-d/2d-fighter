/** returns a 2D context of the canvas from a given selector.
 * @param {string} selector CSS selector as a string;
 * @returns {CanvasRenderingContext2D | undefined}
 * @example 
 * getContext2D("#canvas-one") // returns the canvas element with an id of canvas-one.
 */
export function getContext2D(selector) {
    const canvas = document.querySelector(selector);
    const ctx = canvas.getContext('2d');
    return ctx;
}//end getContext