class ScreenContext {
    adjustForExport() {
        const blueprintSize = blueprintContext.getSizeData();
        const docSize = getDocumentDimensions();

        const x = blueprintSize.x;
        const y = blueprintSize.y;
        const sumDrag = {x: -x - docSize.vw / 2 + 100, y: -y - docSize.vh / 2 + TOP_RIBBON_HEIGHT};
        this.sumDrag = sumDrag;
        this.zoom = 1;
    }

    absolutePointToScreenCoordinates(point) {
        const currentDragValue = this.getCurrentDragValue();
        const sumDrag = this.sumDrag;
        const canvasSize = this.getCanvasSize();

        return {
            x: point.x * this.zoom + canvasSize.x / 2 + sumDrag.x * this.zoom + currentDragValue.x, 
            y: point.y * this.zoom + canvasSize.y / 2 + sumDrag.y * this.zoom + currentDragValue.y
        };
    }
}