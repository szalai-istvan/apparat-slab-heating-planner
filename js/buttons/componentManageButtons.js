var rotateLeftButton;
var rotateRightButton;
var deleteButton;
var addToGroupButton;
var removeFromGroupButton;

/**
 * Elforgatja a kiválasztott objektumot a megadott irányba
 * 
 * @param {Number} direction
 * @returns {undefined}
 */
function rotateSelectedObject(direction) {
    if (selectedSlabHeaterGroup) {
        rotateSelectedSlabHeaterGroup(direction);
    } else if (selectedBoxGroup) {
        rotateSelectedBoxGroup(direction);
    }
}

function addToSelectedGroup() {
    if (selectedSlabHeaterGroup) {
        addSlabHeaterToSelectedGroup();
    }
}

function removeLastFromSelectedGroup() {
    if (selectedSlabHeaterGroup) {
        removeLastSlabHeaterFromSelectedGroup();
    }
}