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
    const sumDrag = this.sumDrag;
    const canvasSize = this.getCanvasSize();

    return {
        x: (mouseX - currentDragValue.x - sumDrag.x * this.zoom - canvasSize.x / 2) / this.zoom,
        y: (mouseY - currentDragValue.y - sumDrag.y * this.zoom - canvasSize.y / 2) / this.zoom
    };
}