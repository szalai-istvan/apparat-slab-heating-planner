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