/**
 * Kiszámolja a paraméterül kapott födémfűtő elem képernyőn megjelenítendő koordinátáit, megakadályozva, hogy a UI alá csússzon az elem
 * 
 * @param {SlabHeater} slabHeater födémfűtő
 * @param {Number} width elem szélessége
 * @param {Number} length elem hosszúsága
 * @returns {Point} a megjelenítendő pozíció
 */
function calculateSlabHeaterCenterPositionWithCorrection(slabHeater, width, length) {
    checkClass(slabHeater, CLASS_SLAB_HEATER);

    const ratio = pixelsPerMetersRatio;
    let x_;
    let y_;

    if (slabHeater.group.alignment % 2 === 1) {
        x_ = width * ratio;
        y_ = (length + TUBE_DISTANCE_IN_METER) * ratio;
    } else {
        x_ = (length + TUBE_DISTANCE_IN_METER) * ratio;
        y_ = width * ratio;
    }

    const mousePosition = getMousePosition();
    const mousePositionAbsolute = getMousePositionAbsolute();
    const xCorrection = calculateCorrector(LEFT_RIBBON_WIDTH + (SLAB_HEATER_CORRECTION_OFFSET + x_ / 2) * screenZoom, mousePosition.x);
    const yCorrection = calculateCorrector(TOP_RIBBON_HEIGHT + (SLAB_HEATER_CORRECTION_OFFSET + y_ / 2) * screenZoom, mousePosition.y);

    const x = mousePositionAbsolute.x + (xCorrection || 0);
    const y = mousePositionAbsolute.y + (yCorrection || 0);
    return getClosestGridPoint(createPoint(x, y));
}