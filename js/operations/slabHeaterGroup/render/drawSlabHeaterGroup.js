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

    for (let i = 0; i < slabHeaters.length; i++) {
        const slabHeater = slabHeaters[i];
        drawSlabHeater(slabHeater);
    }

    const pipeDriver = slabHeaterGroup.pipeDriver;
    // const firstPoint = SlabHeaterGroupManager.calculatePipeDriverFirstPoint(slabHeaterGroup);
    // PipeDriverManager.updateFirstPoint(pipeDriver, firstPoint);
    // PipeDriverRenderer.draw(pipeDriver);
}