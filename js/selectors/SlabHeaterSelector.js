class SlabHeaterSelector {

    static select(slabHeater) {
        slabHeater.isSelected = true;
    }

    static selectForDrag(slabHeater) {
        slabHeater.isSelected = true;
        slabHeater.isSelectedForDrag = true;
        // panel.room && RoomManager.removePanelFromRoom(panel.room, panel);
        // panel.room = undefined; TODO Ez valószínűleg kelleni fog
    }

    static tryToDeselect(slabHeater) {
        if (slabHeater.isSelectedForDrag) {
            slabHeater.centerPosition = gridContext.closestGridPointToCursor();
        }

        const destinationRoom = roomContext.registerRelocatedSlabHeatingAndReturnContainingRoom(slabHeater);
        if (!destinationRoom) {
            return false;
        }
        //panel.room = destinationRoom;

        slabHeater.isSelected = false;
        slabHeater.isSelectedForDrag = false;

        return true;
    }
}