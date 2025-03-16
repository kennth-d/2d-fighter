export function drawRoundDecal(ctx, identifier) {
    ctx.drawImage(
        ROUND_STATUS.img,
        ROUND_STATUS[identifier].x,
        ROUND_STATUS[identifier].y,
        ROUND_STATUS[identifier].width,
        ROUND_STATUS[identifier].height,
        Math.floor(ctx.canvas.width / 2 - ROUND_STATUS[identifier].width/2),
        MENU_CENTER.Y - 200,
        ROUND_STATUS[identifier].width,
        ROUND_STATUS[identifier].height,
    );
}//end drawStatus