/**
 * Megigazítja a csővezető utolsó pontjait
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {BoxGroup} boxGroup 
 * @returns {boolean} true ha a művelet sikeres, egyébként false.
 */
function adjustLastPointOfPipeDriver(pipeDriver, boxGroup) {
    const points = pipeDriver.points;
    const lastPoint = points[points.length - 1];
    const secondToLastPoint = points[points.length - 2];
    const endNodeCoordinates = boxGroup.pipeDriverEndNodeCoordinates;

    const threshold = GRID_RESOLUTION_METER * pixelsPerMetersRatio;
    if (points.length > 2 || calculateDistance(lastPoint, endNodeCoordinates) < threshold) {
        const lastDirection = getDirectionBetweenTwoPoints(secondToLastPoint, lastPoint);

        if (lastDirection === DIRECTION_X) {
            secondToLastPoint.y = endNodeCoordinates.y;
        } else if (lastDirection === DIRECTION_Y) {
            secondToLastPoint.x = endNodeCoordinates.x;
        }

        pipeDriver.points[pipeDriver.points.length - 1] = endNodeCoordinates;
        return true;
    }

    return false;
}