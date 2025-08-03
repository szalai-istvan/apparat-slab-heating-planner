/**
 * Felrajzolja a rajzlapra a paraméterül kapott födémfűtő csoportor
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
    // const firstPoint = SlabHeaterGroupManager.calculatePipeDriverFirstPoint(slabHeaterGroup);
    // PipeDriverManager.updateFirstPoint(pipeDriver, firstPoint);
    // PipeDriverRenderer.draw(pipeDriver);
}