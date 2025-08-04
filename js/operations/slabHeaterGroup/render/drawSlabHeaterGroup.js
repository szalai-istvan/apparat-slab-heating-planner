/**
 * Felrajzolja a rajzlapra a paraméterül kapott födémfűtő csoportot
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup födémfűtő csoport
 * @returns {undefined}
 */
function drawSlabHeaterGroup(slabHeaterGroup) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP);

    const slabHeaters = slabHeaterGroup.slabHeaters;
    if (slabHeaterGroup.isSelectedForDrag) {
        updateSlabHeaterGroupMemberPosition(slabHeaterGroup);
    }

    slabHeaters.forEach(sh => drawSlabHeater(sh));

    const pipeDriver = slabHeaterGroup.pipeDriver;
    const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
    updatePipeDriverFirstPoint(pipeDriver, firstPoint);
    drawPipeDriver(pipeDriver);
}