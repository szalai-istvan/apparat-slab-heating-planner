/**
 * Visszaadja a paraméterül kapott ponthoz legközelebbi grid pontot
 * 
 * @param {Point} point paraméter
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGridPoint(point) {
    checkClass(point, CLASS_POINT);

    if (!gridSeed) {
        return point;
    }

    const x = gridSeed.x + Math.round((point.x - gridSeed.x) / gridResolutionPixel) * gridResolutionPixel;
    const y = gridSeed.y + Math.round((point.y - gridSeed.y) / gridResolutionPixel) * gridResolutionPixel;

    return createPoint(x, y);
}

/**
 * Visszaadja a kurzorhoz legközelebbi grid pontot
 * 
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGridPointToCursor() {
    return getClosestGridPoint(getMousePositionAbsolute());
}