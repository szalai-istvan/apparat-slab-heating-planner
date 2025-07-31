/**
 * Törli az összes létrehozott szobát
 * 
 * @returns {undefined}
 */
function clearRooms() { // formerly: roomContext.clear()
    elementStore.rooms = [];
    deselectRoom();
    clearSlabHeaterGroups();
}