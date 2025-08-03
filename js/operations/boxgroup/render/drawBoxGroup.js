/**
 * Felrajzolja a képernyőre a paraméterül kapott doboz csoportot
 * 
 * @param {BoxGroup} boxGroup
 * @returns {undefined} 
 */
function drawBoxGroup(boxGroup) {
    checkClass(boxGroup, CLASS_BOX_GROUP);

    if (boxGroup.isSelectedForDrag) {
        updateBoxGroupMemberPosition(boxGroup);
    }

    boxGroup.boxes.forEach(b => drawBox(b));
}