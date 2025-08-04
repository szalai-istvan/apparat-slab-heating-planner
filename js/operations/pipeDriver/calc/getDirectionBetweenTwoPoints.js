/**
 * Megállapítja a két pont közötti irányt
 * 
 * @param {Point} p1 
 * @param {Point} p2
 * @returns {string} (x, vagy y) 
 */
function getDirectionBetweenTwoPoints(p1, p2) {
    if (roundNumber(p1.x, 2) === roundNumber(p2.x, 2)) {
        return DIRECTION_Y;
    } else if (roundNumber(p1.y, 2) === roundNumber(p2.y, 2)) {
        return DIRECTION_X;
    }
}