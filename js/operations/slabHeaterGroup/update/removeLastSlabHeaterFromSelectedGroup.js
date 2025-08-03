/**
 * Eltávolítja a legutolsó födémfűtő elemet a kiválasztott csoportból
 * 
 * @returns {undefined}
 */
function removeLastSlabHeaterFromSelectedGroup() {
    const slabHeaterGroup = selectedSlabHeaterGroup;
    if (!slabHeaterGroup) {
        return;
    }
    const lastSlabHeater = slabHeaterGroup.slabHeaters[slabHeaterGroup.slabHeaters.length - 1];
    detachSlabHeaterFromGroup(lastSlabHeater);
    elementStore.remove(lastSlabHeater);
}