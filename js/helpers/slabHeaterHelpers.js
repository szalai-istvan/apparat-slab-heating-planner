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

    if (slabHeater.alignment % 2 === 1) {
        x_ = width;
        y_ = length;
    } else {
        x_ = length;
        y_ = width;
    }

    const mousePosition = screenContext.getMousePosition();
    const mousePositionAbsolute = screenContext.getMousePositionAbsolute();
    const xCorrection = calculateCorrector(LEFT_RIBBON_WIDTH + (SLAB_HEATER_CORRECTION_OFFSET + x_ / 2) * screenContext.zoom, mousePosition.x);
    const yCorrection = calculateCorrector(TOP_RIBBON_HEIGHT + (SLAB_HEATER_CORRECTION_OFFSET + y_ / 2) * screenContext.zoom, mousePosition.y);
    return gridContext.closestGridPoint({
        x: mousePositionAbsolute.x + (xCorrection || 0),
        y: mousePositionAbsolute.y + (yCorrection || 0)
    });
}

function offsetCenterPosition({ originalCenter, width, alignment, index }) {
    const verticalOffset = alignment % 2 === 0;
    const offsetValue = width * scaleContext.pixelsPerMetersRatio * index;

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