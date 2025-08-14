/**
 * A paraméterül kapott csővezető csöveit kalkulálja ki.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function calculatePipies(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    const slabHeaterGroup = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId);
    const beginningPoints = calculatePipeBeginningPointsOfSlabHeaterGroup(slabHeaterGroup);
}