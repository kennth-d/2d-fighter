/** toggles the debug value of an entity. precondition: entity has a debug boolean field.
 *  @param {Object[]} entities an array of Objects with a debug field.
**/
export function toggleDebug(entities) {
    for (const entity of entities) {
        entity.debug = Boolean(Math.abs(entity.debug - 1));
    }
}//end toggleDebug

/** Logs entities to the console.
 *  @param {Object} entities the object to be logged. 
 **/
export function logEntities(entities) {
    for (const entity of entities) {
        console.log(entity);
    }
}//end logEntities

/**
* 
* @param {CanvasRenderingContext2D} ctx canvas rendering context.
* @param {[x:int, y:int, width:int, height:int]} box parameters of the box to draw.
* @param {string} color css color property.
**/
export function drawDebugBox(ctx, box, color) {
    if (!Array.isArray(box)) return;

    const [x = 0, y = 0, width = 0, height = 0] = box;
    ctx.beginPath();
    ctx.strokeStyle = color + "AA";
    ctx.fillStyle = color + "44";
    ctx.fillRect(
        Math.floor(x) + 0.5,
        Math.floor(y) + 0.5,
        width,
        height,
    );
    
    ctx.rect(
        Math.floor(x) + 0.5,
        Math.floor(y) + 0.5,
        width,
        height,
    );
    ctx.stroke();
}//end drawDebugBox
