/**
 * A paraméterül kapott alapállapotba állítja vissza
 * 
 * @param {PipeDriver} pipeDriver csővezető
 * @returns {undefined}
 */
function resetPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER, true);

    if (!pipeDriver) {
        return;
    }

    const endingBoxGroup = getBoxGroupWithEndNodeAtPipeDriversLastPoint(pipeDriver);
    if (endingBoxGroup) {
        endingBoxGroup.pipeDriver = null;
    }

    forceDeselectPipeDriver(pipeDriver);
    pipeDriver.points = [pipeDriver.points[0]];
    pipeDriver.isFullyConfigured = false;
}


function forceDeselectPipeDriver(pipeDriver = undefined) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER, true);

    pipeDriver = pipeDriver || selectedPipeDriver;
    if (!pipeDriver) {
        return true;
    }

    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
    pipeDriver.selectedPointIndex = null;
    selectedPipeDriver = null;
}