class SlabHeaterGroup {
    type;
    color;
    length;
    width;
    alignment;
    isSelected;
    isSelectedForDrag;

    slabHeaters = [];
    pointIsInsideCache = null;
    pipeDriver;

    constructor({slabHeater, length, width, alignment}) {
        if (slabHeater) {
            this.slabHeaters.push(slabHeater);
            slabHeater.group = this;
        }
        elementStore.register(this);

        this.isSelected = false;
        this.isSelectedForDrag = false;

        this.type = width.toString().replace('.', ',') + ' m x ' + length.toString().replace('.', ',') + ' m';
        this.color = BLACK;
        this.length = length;
        this.width = width;
        this.alignment = alignment ?? 1;

        this.pipeDriver = new PipeDriver(SlabHeaterGroupManager.calculatePipeDriverFirstPoint(this));
    }
}