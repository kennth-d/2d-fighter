import { ROUND_STATUS } from "../../assets/data/RoundStatusData.js";
import { MENU } from "../utils/const.js";

export function drawRoundStatus(ctx, identifier, scale) {
    const status = ROUND_STATUS[identifier];
    
    ctx.drawImage(
        ROUND_STATUS.img,
        status.x,
        status.y,
        status.width,
        status.height,
        MENU.centerX - Math.floor(status.width/2) * scale,
        MENU.centerY - Math.floor(status.height/2) * scale,
        status.width * scale,
        status.height * scale,
    )//end drawImage

    ctx.restore();
}//end drawRoundStatus

export function drawGameOver(ctx, identifier, scale) {
    const status = ROUND_STATUS[identifier];
    ctx.drawImage(
        ROUND_STATUS.img2,
        status.x,
        status.y,
        status.width,
        status.height,
        MENU.centerX - Math.floor(status.width/2) * scale,
        MENU.centerY - Math.floor(status.height/2) * scale,
        status.width * scale,
        status.height * scale,
    )//end drawGameOver
}//end DrawGameOver

export function drawTransparencyMask(ctx, percent) {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalAlpha = percent;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalAlpha = 1;
}