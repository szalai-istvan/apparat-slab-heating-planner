let selectedObject;

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObject(obj) {
    const successfulDeselect = clearSelection();
    if (!successfulDeselect) {
        return;
    }

    selectedObject = obj;
    const className = getClassName(obj);
    if (className === CLASS_ROOM) {
        selectRoom(selectedObject);
    } else {
        throw new Error(`Unexpected class of selected object: ${className}`);
    }
}