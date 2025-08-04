class PipeDriver {
    isSelected;
    isSelectedForDrag;
    selectedPointIndex;
    selectedPointIndexCache = null;
    cursorIsInsidePointIndexCache = null;

    points = [];

    constructor(firstPoint) {
        firstPoint && this.points.push(firstPoint);

        elementStore.register(this);
    }
}