/**
 * Törli a kiválasztott doboz csoportot
 * 
 * @returns {undefined}
 */
function removeSelectedBoxGroup() {
    const boxGroup = selectedBoxGroup;

    if (boxGroup) {
        elementStore.remove(boxGroup);
        selectedBoxGroup = null;
        boxGroup.boxes.forEach(b => elementStore.remove(b));
    }
}