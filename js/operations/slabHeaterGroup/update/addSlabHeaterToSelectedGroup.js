/**
 * Hozzáad egy födémfűtő panelt a kiválasztott csoporthoz
 * 
 * @returns {undefined}
 */
function addSlabHeaterToSelectedGroup() {
    const selectedGroup = selectedSlabHeaterGroup;
    if (!selectedGroup) {
        return;
    }

    const nextPosition = nextSlabHeaterPosition(selectedGroup);
    const slabHeater = createSlabHeater(true);
    slabHeater.centerPosition = nextPosition;

    const newMemberIsValid = selectedGroup.isSelectedForDrag || validateSlabHeaterGroupPositionAndGetContainingRoom(selectedGroup);
    if (!newMemberIsValid) {
        displayMessage('A hozzáadni kívánt elem része vagy egésze szobán kívülre kerülne!');
        removeLastSlabHeaterFromSelectedGroup();
        return;
    }

    const firstPoint = calculatePipeDriverFirstPoint(selectedGroup);
    updatePipeDriverFirstPoint(selectedGroup.pipeDriver, firstPoint);
    pipeDriver.slabHeaterGroupAlignment = slabHeaterGroup.alignment;
}

function nextSlabHeaterPosition(group) {
    const lastSlabHeater = group.slabHeaters[group.slabHeaters.length - 1];
    const lastCenter = lastSlabHeater.centerPosition;
    const width = group.width;
    const horizontal = slabHeaterGroupIsHorizontal(group);

    const x = lastCenter.x + horizontal * width * pixelsPerMetersRatio;
    const y = lastCenter.y + (1 - horizontal) * width * pixelsPerMetersRatio;
    return createPoint(x, y);
}