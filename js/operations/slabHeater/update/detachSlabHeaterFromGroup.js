/**
 * Leválasztja a paraméterül kapott födémfűtő elemet a csoportról
 * 
 * @param {SlabHeater} slabHeater
 * @returns {undefined}
 */
function detachSlabHeaterFromGroup(slabHeater) {
    checkClass(slabHeater, CLASS_SLAB_HEATER);

    const slabHeaterGroup = selectedSlabHeaterGroup;
    if (!slabHeaterGroup) {
        return;
    }

    slabHeaterGroup.slabHeaters = slabHeaterGroup.slabHeaters.filter(sh => sh !== slabHeater);
    slabHeater.group = null;
}