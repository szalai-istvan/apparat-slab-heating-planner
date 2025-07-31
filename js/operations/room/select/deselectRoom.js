/**
 * Megszűnteti a kiválasztott szoba kiválasztottságát
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectRoom() {
    const room = selectedRoom;
    if (room && roomIsConfigured(room)) {
        room.isSelected = false;
        selectedRoom = null;

        if (mousePointerIsInsideRoom(room)) {
            room.textCenterCoordinates = getMousePositionAbsolute();
        }
    }
    return true;
}