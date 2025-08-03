/**
 * Megkíséreli megszüntetni a födémfűtő csoport kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectSlabHeaterGroup() {
    const slabHeaterGroup = selectedSlabHeaterGroup;

    if (!slabHeaterGroup) {
        return true;
    }

    const destinationRoom = validateSlabHeaterGroupPositionAndGetContainingRoom(slabHeaterGroup);
    checkClass(destinationRoom, CLASS_ROOM, true);

    if (!destinationRoom) {
        return false;
    }

    slabHeaterGroup.room = destinationRoom;
    slabHeaterGroup.color = destinationRoom.slabHeaterColor;
    
    slabHeaterGroup.isSelected = false;
    slabHeaterGroup.isSelectedForDrag = false;
    slabHeaterGroup.room = destinationRoom;
    
    selectedSlabHeaterGroup = null;
    cachedSelectableSlabHeaterGroup = null;
    
    return true;
}