//flips debug = true for each entity
export function toggleDebug(entities) {
    for (const entity of entities) {
        entity.debug = Boolean(Math.abs(entity.debug - 1));
    }
}

//logs each entity to the console
export function logEntities(entities) {
    for (const entity of entities) {
        console.log(entity);
    }
}

