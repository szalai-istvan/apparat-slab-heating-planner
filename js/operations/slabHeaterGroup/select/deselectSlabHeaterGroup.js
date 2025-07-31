/**
 * Megkíséreli megszüntetni a födémfűtő csoport kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectSlabHeaterGroup() {
    const slabHeaterGroup = selectedSlabHeaterGroup;

    const destinationRoom = validatePositionAndGetContainingRoom(slabHeaterGroup);
    if (!destinationRoom) {
        return false;
    }

    slabHeaterGroup.room = destinationRoom;
    slabHeaterGroup.color = destinationRoom.slabHeaterColor;
    
    slabHeaterGroup.isSelected = false;
    slabHeaterGroup.isSelectedForDrag = false;
    
    selectedSlabHeaterGroup = null;
    cachedSelectedSlabHeaterGroup = null;
    
    return true;
}