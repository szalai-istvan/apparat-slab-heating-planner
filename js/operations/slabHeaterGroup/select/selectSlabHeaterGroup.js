let selectedSlabHeaterGroup = null;
let cachedSelectedSlabHeaterGroup = null;

/**
 * Megkeresi és kiválasztja a födémfűtő csoportot és visszaadja
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup Opcionális paraméter, specifikálható a kiválasztandó födémfűtő csoport.
 * @returns {SlabHeaterGroup} a kiválasztott födémfűtő csoport.
 */
function selectSlabHeaterGroup(slabHeaterGroup = undefined) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP, true);

    slabHeaterGroup = slabHeaterGroup || checkForSelectableSlabHeaterGroup();
    if (!slabHeaterGroup) {
        return;
    }

    if (slabHeaterGroup === selectedSlabHeaterGroup) {
        slabHeaterGroup.isSelected = true;
        slabHeaterGroup.isSelectedForDrag = true;
        return slabHeaterGroup;
    }

    if (deselectObject()) {
        slabHeaterGroup.isSelected = true;
        selectedSlabHeaterGroup = slabHeaterGroup;
        return slabHeaterGroup;
    }
    return undefined;
}

/**
 * Megkeresi a kiválasztható födémfűtő csoportot és visszaadja
 * 
 * @returns {SlabHeaterGroup} a kiválaszthatü födémfűtő csoport.
 */
function checkForSelectableSlabHeaterGroup() {
    if (cachedSelectedSlabHeaterGroup) {
        return cachedSelectedSlabHeaterGroup;
    }

    const selection = elementStore.slabHeaterGroups.filter(shg => mouseCursorIsInsideMembersTextbox(shg));
    const slabHeaterGroup = selection[0];
    if (slabHeaterGroup) {
        return slabHeaterGroup;
    }
    return undefined;
}