/**
 * Megállapítja, hogy a kurzor benne van-e a paraméterül kapott födémfűtő elem szövegdobozában
 * 
 * @param {SlabHeater} slabHeater födémfűtő elem 
 * @returns {boolean}
 */
function mouseCursorIsInsideSlabHeatersTextbox(slabHeater) {
    if (!slabHeater.centerPosition) {
        return false;
    }

    if (!slabHeater.group) {
        return false;
    }

    if (slabHeater.group.alignment % 2 === 1) {
        return pointIsInside(
            getMousePositionAbsolute(),
            slabHeater.centerPosition,
            slabHeater.rectHeight,
            slabHeater.rectWidth
        );
    }
    return pointIsInside(
        getMousePositionAbsolute(),
        slabHeater.centerPosition,
        slabHeater.rectWidth,
        slabHeater.rectHeight
    );

}