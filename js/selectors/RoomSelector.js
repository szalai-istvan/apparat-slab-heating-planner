class RoomSelector {

    static select(room) {
        room.isSelected = true;
    }

    static tryToDeselect(room) {
        room.isSelected = false;
        if (RoomManager.pointIsInsideRoom(room)) {
            room.textCenterCoordinates = screenContext.getMousePositionAbsolute();
        }
        return true;
    }
}