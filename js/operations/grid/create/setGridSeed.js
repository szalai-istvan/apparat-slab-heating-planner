let gridSeed = null;

/**
 * Beállítja a paraméterül kapott pontot a grid origójaként.
 * 
 * @param {Point} point paraméter
 * @returns {undefined} 
 */
function setGridSeed(point) {
    checkClass(point, CLASS_POINT);

    if (gridSeed) {
        throw new Error('Attempt to double set seed!');
    }

    gridSeed = createPoint(point.x, point.y);
}