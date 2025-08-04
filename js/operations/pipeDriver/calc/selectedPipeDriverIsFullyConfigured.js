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

    return pipeDriver.points.length >= 5;
}