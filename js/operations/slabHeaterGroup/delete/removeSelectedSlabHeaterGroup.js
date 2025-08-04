/**
 * Törli a kiválasztott födémfűtő csoportot
 * 
 * @returns {undefined}
 */
function removeSelectedSlabHeaterGroup() {
    const slabHeaterGroup = selectedSlabHeaterGroup;
    
    if (slabHeaterGroup) {
        elementStore.remove(slabHeaterGroup);
        selectedSlabHeaterGroup = null;
        slabHeaterGroup.slabHeaters.forEach(sh => elementStore.remove(sh));
        elementStore.remove(slabHeaterGroup.pipeDriver);
    }
}