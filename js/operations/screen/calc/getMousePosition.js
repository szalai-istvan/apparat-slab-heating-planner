/**
 * Visszaadja a kurzort pozícióját a képernyőn
 * 
 * @returns {Point} a kurzor pozíciója
 */
function getMousePosition() {
    return { x: mouseX, y: mouseY };
}

/**
 * Visszaadja a kurzort pozícióját a képernyőn drag értékekkel korrigálva
 * 
 * @returns {Point} a kurzor pozíciója
 */
function getMousePositionAbsolute() {
    const currentDragValue = getCurrentDragValue();
    const sumDrag = screenSumDrag;
    const canvasSize = getCanvasSize();

    const x = (mouseX - currentDragValue.x - sumDrag.x * screenZoom - canvasSize.x / 2) / screenZoom;
    const y = (mouseY - currentDragValue.y - sumDrag.y * screenZoom - canvasSize.y / 2) / screenZoom;
    return createPoint(x, y);
}