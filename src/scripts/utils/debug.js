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
export function drawDebugBox(ctx, viewport, box, color) {
    ctx.save();

    if (!Array.isArray(box)) return;
    if (color === "#FF8E2") {
        console.log("drawing projectile debug"); 
        console.log(box);
    }

    const [x = 0, y = 0, width = 0, height = 0] = box;
    ctx.beginPath();
    ctx.strokeStyle = color + "AA";
    ctx.fillStyle = color + "44";
    ctx.fillRect(
        Math.floor(x - viewport.pos.x) + 0.5,
        Math.floor(y - viewport.pos.y) + 0.5,
        width,
        height,
    );
    
    ctx.rect(
        Math.floor(x - viewport.pos.x) + 0.5,
        Math.floor(y - viewport.pos.y) + 0.5,
        width,
        height,
    );
    ctx.stroke();
    ctx.restore();
}//end drawDebugBox

export function drawDebugScreenSize(ctx, color, lineWidth) {
    ctx.save()
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.moveTo(0, 0);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();

    ctx.moveTo(ctx.canvas.width, 0);
    ctx.lineTo(0, ctx.canvas.height);
    ctx.stroke();
    ctx.restore();
    return;
}//end drawDebugScreenSize

export function debugAI(ctx, fighter) {
    ctx.save()
    ctx.font = "12px";
    const curState = "cur: " + fighter.ai.state.name;
    const last = "last:" + fighter.ai.lastAttack;
    ctx.fillStyle = "white";
    ctx.fillText(curState, ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 25);
    ctx.fillText(last, ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 10)
    ctx.restore();
}