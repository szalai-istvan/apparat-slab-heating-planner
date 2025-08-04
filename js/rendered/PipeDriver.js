class PipeDriver {
    isSelected;
    isSelectedForDrag;
    selectedPointIndex;
    selectedPointIndexCache = null;
    cursorIsInsidePointIndexCache = null;
    slabHeaterGroupAlignment;

    points = [];

    constructor(slabHeaterGroup) {
        const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
        this.slabHeaterGroupAlignment = slabHeaterGroup.alignment;

        firstPoint && this.points.push(firstPoint);

        elementStore.register(this);
    }
}