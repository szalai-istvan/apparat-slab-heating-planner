let selectedRoom = null;
let cachedSelectedRoom = null;

/**
 * Megkeresi a kiválasztható szobát és visszaadja
 * 
 * @param {Room} room Opcionális paraméter, specifikálható a kiválasztandó szoba.
 * @returns {Room} a kiválasztott szoba.
 */
function selectRoom(room = undefined) {
    checkClass(room, CLASS_ROOM, true);

    room = room || checkForSelectableRoom();
    if (!room) {
        return;
    }

    deselectRoom();
    room.isSelected = true;
    selectedRoom = room;
    return room;
}

function checkForSelectableRoom() { // formerly: roomContext.checkForSelection
    if (cachedSelectedRoom) {
        return cachedSelectedRoom;
    }

    const selection = elementStore.rooms.filter(r => RoomManager.mouseCursorIsInsideName(r));
    const room = selection[0];
    if (room) {
        selectedRoom = room;
        return room;
    }
}