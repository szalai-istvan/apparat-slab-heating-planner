let screenDraggingInProgress;
let screenDragStartPosition;
let screenZoom = 1;

function startDragging() {
    screenDragStartPosition = this.getMousePosition();
    screenDraggingInProgress = true;
}

function stopDragging() {
    this.updateSumDrag();
    screenDraggingInProgress = false;
}

function zoomIn() {
    screenZoom = Math.min(MAXIMUM_ZOOM, screenZoom * ZOOM_STEP);
}

function zoomOut() {
    screenZoom = Math.max(MINIMUM_ZOOM, screenZoom / ZOOM_STEP);
}