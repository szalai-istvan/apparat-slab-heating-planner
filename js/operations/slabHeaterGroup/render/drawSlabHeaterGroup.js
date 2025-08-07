/**
 * Felrajzolja a rajzlapra a paraméterül kapott födémfűtő csoportot
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup födémfűtő csoport
 * @returns {undefined}
 */
function drawSlabHeaterGroup(slabHeaterGroup) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP);

    const slabHeaters = slabHeaterGroup.slabHeaters;
    const pipeDriver = slabHeaterGroup.pipeDriver;
    
    if (slabHeaterGroup.isSelectedForDrag) {
        updateSlabHeaterGroupMemberPosition(slabHeaterGroup);

        if (pipeDriver) {
            const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
            updatePipeDriverFirstPoint(pipeDriver, firstPoint);
        }
    }

    slabHeaters.forEach(sh => drawSlabHeater(sh));
    drawPipeDriver(pipeDriver);
}