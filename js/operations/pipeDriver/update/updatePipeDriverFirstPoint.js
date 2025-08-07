/**
 * Frissíti a csővezető objektum első pontját
 * 
 * @param {PipeDriver} pipeDriver csővezető
 * @param {Point} firstPoint első pont
 * @returns {undefined}
 */
function updatePipeDriverFirstPoint(pipeDriver, firstPoint) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);
    checkClass(firstPoint, CLASS_POINT, true);
    if (!firstPoint) {
        return;
    }

    const points = pipeDriver.points;
    if (points.length === 0) {
        points.push(firstPoint);
        return;
    }

    if (points.some(p => calculateDistance(p, firstPoint) < GRID_RESOLUTION_METER * pixelsPerMetersRatio)) {
        return;
    }

    const originalFirstPoint = points[0];
    const secondPoint = points[1];
    points[0] = firstPoint;
    if (!secondPoint) { 
        return;
    }
    
    const direction = getDirectionBetweenTwoPoints(originalFirstPoint, secondPoint);
    if (direction === DIRECTION_X) {
        secondPoint.y = firstPoint.y;
    } else if (direction === DIRECTION_Y) {
        secondPoint.x = firstPoint.x;
    }
}
