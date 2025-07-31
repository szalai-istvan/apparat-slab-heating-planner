function retrieveSlabHeaterColor() {
    if (SLAB_HEATER_COLORS_AVAILABLE.length) {
        const color = randomChoice(SLAB_HEATER_COLORS_AVAILABLE);
        SLAB_HEATER_COLORS_AVAILABLE = SLAB_HEATER_COLORS_AVAILABLE.filter(x => x !== color);
        return color;
    }
    return randomChoice(SLAB_HEATER_COLORS);
}

function giveBackSlabHeaterColor(color) {
    if (SLAB_HEATER_COLORS_AVAILABLE.includes(color)) {
        return;
    }
    SLAB_HEATER_COLORS_AVAILABLE.push(color);
}

function getCenterPositionWithCorrection(slabHeater, width, length) {
    let x_;
    let y_;
    const ratio = pixelsPerMetersRatio;

    if (slabHeater.group.alignment % 2 === 1) {
        x_ = width * ratio;
        y_ = (length + TUBE_DISTANCE_IN_METER) * ratio;
    } else {
        x_ = (length + TUBE_DISTANCE_IN_METER) * ratio;
        y_ = width * ratio;
    }

    const mousePosition = screenContext.getMousePosition();
    const mousePositionAbsolute = getMousePositionAbsolute();
    const xCorrection = calculateCorrector(LEFT_RIBBON_WIDTH + (SLAB_HEATER_CORRECTION_OFFSET + x_ / 2) * screenZoom, mousePosition.x);
    const yCorrection = calculateCorrector(TOP_RIBBON_HEIGHT + (SLAB_HEATER_CORRECTION_OFFSET + y_ / 2) * screenZoom, mousePosition.y);
    return gridContext.closestGridPoint({
        x: mousePositionAbsolute.x + (xCorrection || 0),
        y: mousePositionAbsolute.y + (yCorrection || 0)
    });
}

function offsetCenterPosition({ originalCenter, width, alignment, index }) {
    const verticalOffset = alignment % 2 === 0;
    const offsetValue = width * pixelsPerMetersRatio * index;

    if (verticalOffset) {
        return {
            x: originalCenter.x,
            y: originalCenter.y + offsetValue
        };
    }
    return {
        x: originalCenter.x + offsetValue,
        y: originalCenter.y
    };
}