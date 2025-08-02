/**
 * Megállapítja, hogy a kurzor a paraméterül kapott födémfűtő csoport valamely tagjának szövegdobozában található-e
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {boolean}
 */
function mouseCursorIsInsideMembersTextbox(slabHeaterGroup) {
    if (slabHeaterGroup.cursorIsInsideCache === null) {
        const selectable = slabHeaterGroup.slabHeaters.filter(sh => mouseCursorIsInsideSlabHeatersTextbox(sh));
        slabHeaterGroup.cursorIsInsideCache = selectable.length > 0;
    }

    return slabHeaterGroup.cursorIsInsideCache;
}
