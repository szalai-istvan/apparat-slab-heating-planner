/**
 * Megszűnteti a kijelölt objektum kiválasztását és visszaküldi, hogy sikerült-e
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectObject() {
    const selected = selectedObject;
    if (selected === null || selected === undefined) {
        return true;
    }

    const className = getClassName(selected);
    let successfulDeselect;
    if (className === CLASS_ROOM) {
        successfulDeselect = deselectRoom();
    } else if (className === CLASS_SLAB_HEATER_GROUP) {
        successfulDeselect = deselectSlabHeaterGroup();
    }

    if (successfulDeselect) {
        selectedObject = null;
    }
    return successfulDeselect;
}
