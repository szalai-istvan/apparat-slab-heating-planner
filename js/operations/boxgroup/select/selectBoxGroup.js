let selectedBoxGroup = null;
let cachedSelectedBoxGroup = null;

/**
 * Megkeresi és kiválasztja a doboz csoportot és visszaadja
 * 
 * @param {BoxGroup} boxGroup Opcionális paraméter, specifikálható a kiválasztandó csoport.
 * @returns {BoxGroup} a kiválasztott csoport.
 */
function selectBoxGroup(boxGroup = undefined) {
    checkClass(boxGroup, CLASS_BOX_GROUP, true);

    boxGroup = boxGroup || checkForSelectableBoxGroup();
    if (!boxGroup) {
        return;
    }

    if (boxGroup === selectedBoxGroup) {
        boxGroup.isSelected = true;
        boxGroup.isSelectedForDrag = true;
        setSelectedBoxGroupIndex(slabHeaterGroup);
        return boxGroup;
    }

    if (deselectObject()) {
        boxGroup.isSelected = true;
        selectedBoxGroup = boxGroup;
        return boxGroup;
    }
    return undefined;
}

function checkForSelectableBoxGroup() {
    // TO BE CONTINUED
}

function setSelectedBoxGroupIndex() {
    // TO BE CONTINUED
}