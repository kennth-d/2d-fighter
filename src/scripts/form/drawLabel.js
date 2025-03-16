import { SETTINGS_LABEL_DATA } from "../../assets/data/labelData.js";

export function drawLabel(ctx, id, x, y) {
    let { x: sx, y: sy, width: sw, height: sh } = SETTINGS_LABEL_DATA[id];
    ctx.drawImage (
        SETTINGS_LABEL_DATA.IMG,
        sx, sy, sw, sh,
        x, y, sw, sh,
    );
}//end drawLabel