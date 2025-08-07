/**
 * Megigazítja a csővezető utolsó pontjait
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {BoxGroup} boxGroup 
 */
function adjustLastPointOfPipeDriver(pipeDriver, boxGroup) {
    let lastPoint = pipeDriver.points[pipeDriver.points.length - 1];
    const secondToLastPoint = pipeDriver.points[pipeDriver.points.length - 2];
    const lastDirection = getDirectionBetweenTwoPoints(secondToLastPoint, lastPoint);
    pipeDriver.points[pipeDriver.points.length - 1] = boxGroup.pipeDriverEndNodeCoordinates;
    lastPoint = pipeDriver.points[pipeDriver.points.length - 1];

    if (lastDirection === DIRECTION_X) {
        secondToLastPoint.y = lastPoint.y;
    } else if (lastDirection === DIRECTION_Y) {
        secondToLastPoint.x = lastPoint.x;
    }
}