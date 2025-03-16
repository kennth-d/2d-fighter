import { isInside } from "./mouseHandler.js";

export function getClickedObject(objects, pos) {
    for (let obj of objects) {
        if (isInside(obj.rect, pos)) {
            return obj;
        }//end if
    }//end for
}//end getClickedObject