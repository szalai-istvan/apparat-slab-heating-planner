/**
 * Megkeresi az első objektumot, amelyet ki lehet választani és visszaadja.
 * 
 * @returns {*} Kiválasztható objektum
 */
function searchSelectableObject() {
    const selectedRoom = selectRoom();
    if (selectedRoom) {
        selectedObject = selectedRoom;
        return selectedRoom;
    }
}