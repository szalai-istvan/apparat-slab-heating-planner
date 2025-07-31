/**
 * Megszűnteti a kijelölt objektum kiválasztását és visszaküldi, hogy sikerült-e
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectObject() {
    const selected = selectedObject;
    const className = getClassName(selected);
    let successfulDeselect;
    if (className === CLASS_ROOM) {
        successfulDeselect = deselectRoom();
    }

    if (successfulDeselect) {
        selectedObject = null;
    }
    return successfulDeselect;
}
