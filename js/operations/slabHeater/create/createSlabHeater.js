let alignment = 1;

/**
 * Létrehoz és visszaad egy födémfűtő panel objektumot
 * 
 * @param {boolean} addToGroup flag, hogy meglévő csoporthoz adjuk-e hozzá
 * @returns {SlabHeater} a létrehozott födémfűtő
 */
function createSlabHeater(addToGroup) {
    const width = slabHeaterWidthOptionsBar.getValue();
    const length = slabHeaterLengthOptionsBar.getValue();

    if (!width) {
        displayMessage('A baloldali menü segítségével válassza ki a kívánt szélességet!');
        return;
    }

    if (!length) {
        displayMessage('A baloldali menü segítségével válassza ki a kívánt hosszt!');
        return;
    }

    const slabHeater = new SlabHeater();

    if (selectedSlabHeater && addToGroup) {
        SlabHeaterGroupManager.add(selectedSlabHeater.group, slabHeater);
    } else {
        const group = new SlabHeaterGroup({ slabHeater, length, width, alignment });
        selectObject(slabHeater);
        group.isSelected = true;
        group.isSelectedForDrag = true;
    }

    return slabHeater;
}