/**
 * Törli a projektben található összes födémfűtő panel csoportot
 * 
 * @returns {undefined}
 */
function clearSlabHeaterGroups() {
    elementStore.slabHeaterGroups = [];
    selectedSlabHeaterGroup = null;
}