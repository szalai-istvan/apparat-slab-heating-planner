let screenSumDrag = null;

/**
 * Frissíti a húzás szummázó objektum értékeit
 * 
 * @returns {undefined}
 */
function updateScreenSumDrag() { // formerly screenContext.updateSumDrag()
    if (screenDraggingInProgress) {
        const currentDragValue = getCurrentDragValue();
        screenSumDrag.x += (currentDragValue.x / this.zoom);
        screenSumDrag.y += (currentDragValue.y / this.zoom);
    }
}

setTimeout(() => screenSumDrag = createPoint(0, 0), 200); // TODO setup function-ba berakni