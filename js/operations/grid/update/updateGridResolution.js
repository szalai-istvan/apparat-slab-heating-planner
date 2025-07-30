let gridResolutionPixel = null;

/**
 * Újrakalkulálja a grid pixelekben mért felbontását
 * 
 * @returns {undefined}
 */
function updateGridResolution() { // formerly gridContext.refreshGridResolution()
    const ratio = scaleContext.pixelsPerMetersRatio;
    if (!ratio) {
        gridResolutionPixel = undefined;
    }

    gridResolutionPixel = GRID_RESOLUTION_METER * ratio;
}