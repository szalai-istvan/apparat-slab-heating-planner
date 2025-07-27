class SlabHeaterGroup {
    type;
    color;
    length;
    width;
    alignment;

    slabHeaters = [];
    pointIsInsideCache = null;
    anySelectedCache = null;

    constructor(slabHeater = undefined) {
        slabHeater && this.slabHeaters.push(slabHeater);
        elementStore.register(this);
    }
}