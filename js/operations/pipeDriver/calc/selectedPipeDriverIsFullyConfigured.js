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
            const successfulAdjustment = adjustLastPointOfPipeDriver(pipeDriver, result);
            if (successfulAdjustment) {
                pipeDriver.isFullyConfigured = true;
                result.pipeDriverId = pipeDriver.id;
            } else {
                displayMessage('A végpontigazítás két pontból álló csőnyomvonal esetén nem lehetséges.<br/>Kérem igazítsa a födémáttörés helyzetét a rajzon úgy, hogy a nyomvonal pontosan találjon bele!');
                resetSelectedPipeDriver();
            }
        } else {
            displayMessage('A kiválasztott födémfűtő csoport nem köthető ehhez a födémáttörés csoporthoz, mert az áttörések és a fűtőelemek száma eltér!');
            resetSelectedPipeDriver();
        }
    }
    return pipeDriver.isFullyConfigured;
}


function validateBoxGroupAndPipeDriver(pipeDriver, boxGroup) {
    const slabHeaterGroup = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId);

    return slabHeaterGroup.slabHeaterIds.length === boxGroup.boxIds.length;
}