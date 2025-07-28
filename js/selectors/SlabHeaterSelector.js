class SlabHeaterSelector {

    static select(slabHeater) {
        slabHeater.group.isSelected = true;
    }

    static selectForDrag(slabHeater) {
        slabHeater.group.isSelected = true;
        slabHeater.group.isSelectedForDrag = true;
    }

    static tryToDeselect(slabHeater) {
        if (slabHeater.group.isSelectedForDrag) {
            slabHeater.centerPosition = gridContext.closestGridPointToCursor();
        }

        const destinationRoom = roomContext.registerRelocatedSlabHeatingAndReturnContainingRoom(slabHeater);
        if (!destinationRoom) {
            return false;
        }

        slabHeater.group.color = destinationRoom.slabHeaterColor;
        slabHeater.group.isSelected = false;
        slabHeater.group.isSelectedForDrag = false;

        return true;
    }
}