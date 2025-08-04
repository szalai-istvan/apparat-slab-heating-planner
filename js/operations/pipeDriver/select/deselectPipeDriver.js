/**
 * Megkíséreli megszüntetni a csővezető objektum kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectPipeDriver() {
    const pipeDriver = selectedPipeDriver;
    if (!pipeDriver) {
        return true;
    }

    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
    pipeDriver.selectedPointIndex = null;

    return true;
}