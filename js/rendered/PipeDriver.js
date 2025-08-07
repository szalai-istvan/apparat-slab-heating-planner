class PipeDriver {
    id;
    isSelected;
    isSelectedForDrag;
    selectedPointIndex;
    selectedPointIndexCache = null;
    cursorIsInsidePointIndexCache = null;
    slabHeaterGroup;

    points = [];
    isFullyConfigured = false;

    constructor(slabHeaterGroup) {
        this.id = Math.random().toString().substring(2);
        const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
        this.slabHeaterGroup = slabHeaterGroup;

        firstPoint && this.points.push(firstPoint);

        elementStore.register(this);
    }
}