class SlabHeaterSelector {

    static select(slabHeater) {
        slabHeater.isSelected = true;
    }

    static selectForDrag(slabHeater) {
        slabHeater.isSelected = true;
        slabHeater.isSelectedForDrag = true;
    }

    static tryToDeselect(slabHeater) {
        if (slabHeater.isSelectedForDrag) {
            slabHeater.centerPosition = gridContext.closestGridPointToCursor();
        }

        const destinationRoom = roomContext.registerRelocatedSlabHeatingAndReturnContainingRoom(slabHeater);
        if (!destinationRoom) {
            return false;
        }

        slabHeater.color = destinationRoom.slabHeaterColor;
        slabHeater.isSelected = false;
        slabHeater.isSelectedForDrag = false;

        return true;
    }
}