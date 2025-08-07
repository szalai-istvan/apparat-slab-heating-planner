/**
 * Hozzáadja a következő pontot a kiválasztott csővezető objektumhoz
 * 
 * @returns {undefined}
 */
function addPointToSelectedPipeDriver() {
    const pipeDriver = selectedPipeDriver;
    if (!pipeDriver) {
        return;
    }

    if (selectedPipeDriverIsFullyConfigured()) {
        return;
    }

    const nextPoint = getNextPointToAddToPipeDriver(pipeDriver);
    pipeDriver.points.push(nextPoint);
}