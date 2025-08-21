/**
 * Kiszámolja a csővezetőhöz hozzáadható következő pontot.
 * 
 * @param {PipeDriver} pipeDriver csővezető paraméter
 * @returns {Point} a hozzáadható pont
 */
function getNextPointToAddToPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    const points = pipeDriver.points;
    const direction = getLastDirectionOfPipeDriver(pipeDriver);
    const lastPoint = points[points.length - 1];
    const nextPoint = getClosestGridPointToCursorsCorrectedPosition();

    if (direction === DIRECTION_Y) {
        nextPoint.y = lastPoint.y;
    } else if (direction === DIRECTION_X) {
        nextPoint.x = lastPoint.x;
    }

    return nextPoint;
}