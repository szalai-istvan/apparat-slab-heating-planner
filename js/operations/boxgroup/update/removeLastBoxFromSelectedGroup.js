/**
 * Eltávolítja a legutolsó dobozt a kiválasztott csoportból
 * 
 * @returns {undefined}
 */
function removeLastBoxFromSelectedGroup() {
    const selectedGroup = selectedBoxGroup;
    if (!selectedGroup) {
        return;
    }

    if (selectedGroup.boxes.length < 2) {
        return;
    }

    const box = selectedGroup.boxes[selectedGroup.boxes.length - 1];
    detachBoxFromGroup(box);
    elementStore.remove(box);

    updateBoxGroupPipeDriverEndNodePosition(selectedGroup);
}