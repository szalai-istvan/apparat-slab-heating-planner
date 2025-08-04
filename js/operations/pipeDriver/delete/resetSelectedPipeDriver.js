/**
 * A kiválasztott csővezetőt alapállapotba állítja vissza
 * 
 * @returns {undefined}
 */
function resetSelectedPipeDriver() {
    const pipeDriver = selectedPipeDriver;
    if (!pipeDriver) {
        return;
    }

    pipeDriver.points = [];
    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
}