/**
 * Megállapítja, hogy a kiválasztott csővezető objektum konfigurációja teljes-e
 * 
 * @returns {boolean}
 */
function selectedPipeDriverIsFullyConfigured() {
    const pipeDriver = selectedPipeDriver;
    if (!pipeDriver) {
        return true;
    }

    if (pipeDriver.isFullyConfigured) {
        return true;
    }

    const result = getBoxGroupWithEndNodeAtPipeDriversLastPoint(selectedPipeDriver);
    if (result) {
        const validResult = validateBoxGroupAndPipeDriver(pipeDriver, result);
        if (validResult) {
            pipeDriver.isFullyConfigured = true;
            result.pipeDriver = pipeDriver;
            adjustLastPointOfPipeDriver(pipeDriver, result);
        } else {
            displayMessage('A kiválasztott födémfűtő csoport nem köthető ehhez a födémáttörés csoporthoz, mert az áttörések és a fűtőelemek száma eltér!');
            resetSelectedPipeDriver();
        }
    }
    return pipeDriver.isFullyConfigured;
}


function validateBoxGroupAndPipeDriver(pipeDriver, boxGroup) {
    const slabHeaterGroup = pipeDriver.slabHeaterGroup;
    const slabHeaters = slabHeaterGroup.slabHeaters;
    const boxes = boxGroup.boxes;

    return slabHeaters.length === boxes.length;
}