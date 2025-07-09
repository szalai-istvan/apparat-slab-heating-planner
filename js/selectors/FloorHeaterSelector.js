class FloorHeaterSelector {

    static select(floorHeater) {
        floorHeater.isSelected = true;
    }

    static selectForDrag(floorHeater) {
        floorHeater.isSelected = true;
        floorHeater.isSelectedForDrag = true;
        // panel.room && RoomManager.removePanelFromRoom(panel.room, panel);
        // panel.room = undefined; TODO Ez valószínűleg kelleni fog
    }

    static tryToDeselect(floorHeater) {
        if (floorHeater.isSelectedForDrag) {
            floorHeater.centerPosition = screenContext.getMousePositionAbsolute();
        }

        const destinationRoom = roomContext.registerRelocatedFloorHeatingAndReturnContainingRoom(floorHeater);
        if (!destinationRoom) {
            return false;
        }
        //panel.room = destinationRoom;

        floorHeater.isSelected = false;
        floorHeater.isSelectedForDrag = false;

        return true;
    }
}