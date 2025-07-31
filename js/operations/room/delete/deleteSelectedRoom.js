/**
 * Törli a kiválasztott szobát.
 * 
 * @returns {undefined}
 */
function removeSelectedRoom() {
    const room = selectedRoom;
    if (room) {
        elementStore.remove(room);
        selectedRoom = null;
        giveBackSlabHeaterColor(room.slabHeaterColor);
    }

    if (elementStore.rooms.length === 0) {
        removeGridSeed();
    }
}