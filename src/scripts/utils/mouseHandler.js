/** gets the mouse position.
 * @param {canvas} canvas element from which to get mouse pos from.
 * @param {*} evt trigger
 * @returns \{ mouseX, mouseY }
 */
export function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
  }

/** Checks whether or not a x, y position is within bounds of a rectangle.
 * @param {*} rect any object with { x, y, width, height } properties.
 * @param {*} pos an object with { x, y } properties.
 * @returns true if pos is inside rect, false otherwise.
 */
export function isInside(rect, pos) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}//end isInside