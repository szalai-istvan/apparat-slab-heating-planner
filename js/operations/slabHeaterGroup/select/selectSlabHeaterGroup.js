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
        return;
    }

    deselectSlabHeaterGroup();
    slabHeaterGroup.isSelected = true;
    cachedSelectedSlabHeaterGroup = slabHeaterGroup;
    return slabHeaterGroup;
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

    const selection = elementStore.slabHeaterGroups.filter(shg => slabHeaterGroupCanBeSelected(shg));
    const slabHeaterGroup = selection[0];
    if (slabHeaterGroup) {
        selectedSlabHeaterGroup = slabHeaterGroup;
        return slabHeaterGroup;
    }
    return undefined;
}