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
    if (!destinationRoom) {
        return false;
    }

    slabHeaterGroup.roomId = destinationRoom.id;
    slabHeaterGroup.color = destinationRoom.slabHeaterColor;
    
    slabHeaterGroup.isSelected = false;
    slabHeaterGroup.isSelectedForDrag = false;
    slabHeaterGroup.clickedMemberIndex = null;
    
    selectedSlabHeaterGroup = null;
    cachedSelectableSlabHeaterGroup = null;
    
    return true;
}