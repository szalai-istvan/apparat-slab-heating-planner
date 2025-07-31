/**
 * Törli a kijelölt objektumot.
 * 
 * @returns {undefined}
 */
function removeSelectedObject() {
    const selected = selectedObject;
    if (!selected) {
        return;
    }
    const className = getClassName(selected);
    
    if (className === CLASS_ROOM) {
        removeSelectedRoom();
    }
}