class SlabHeaterGroup {
    type;
    color;
    length;
    width;
    alignment;
    isSelected;
    isSelectedForDrag;
    clickedMemberIndex;
    room;

    slabHeaters = [];
    cursorIsInsideCache = null;
    pipeDriver;

    constructor({ slabHeater, length, width, alignment }) {
        if (slabHeater) {
            this.slabHeaters.push(slabHeater);
            slabHeater.group = this;
        }

        this.isSelected = false;
        this.isSelectedForDrag = false;

        this.color = BLACK;
        this.length = length;
        this.width = width;
        this.alignment = alignment ?? 1;
        updateSlabHeaterGroupType(this);

        this.pipeDriver = new PipeDriver(calculatePipeDriverFirstPoint(this));

        elementStore.register(this);
        elementStore.register(this.pipeDriver);
    }
}