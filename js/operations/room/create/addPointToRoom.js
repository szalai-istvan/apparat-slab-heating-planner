/**
 * Hozzáadja a kurzor pillanatnyi abszolút koordinátáit a kijelölt szoba sarkaihoz
 * 
 * @returns {undefined}
 */
function addPointToSelectedRoom() { // formerly: roomContext.addPoint()
    if (!selectedRoom) {
        return;
    }

    if (roomIsConfigured(selectedRoom)) {
        return;
    }

    if (!pointCanBeAddedToSelectedRoom()) {
        displayMessage('A pont felvétele átfedést okozna a szobák között. Válasszon másik pontot.');
        return;
    }

    addPointToRoom(selectedRoom);
    if (elementStore.rooms.length === 1 && selectedRoom.points.length === 1) {
        gridContext.setSeed(screenContext.getMousePositionAbsolute());
    }

}

function pointCanBeAddedToSelectedRoom() { // formerly: roomContext.pointIsValid()
    if (elementStore.rooms.length < 2) {
        return true;
    }

    return elementStore.rooms.filter(r => mousePointerIsInsideRoom(r)).length === 0;
}

function addPointToRoom(room) {
    const points = room.points;
    const mousePosition = gridContext.closestGridPointToCursor();

    if (points.length >= 2) {
        return;
    }

    points.push(mousePosition);
    if (points.length >= 2) {
        room.middlePoint = getRoomsMiddlePoint(room);
        deselectRoom();
        room.textCenterCoordinates = room.middlePoint;
    }

}