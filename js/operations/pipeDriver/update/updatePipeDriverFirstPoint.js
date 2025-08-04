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
    } else {
        points[0] = firstPoint;
    }
}