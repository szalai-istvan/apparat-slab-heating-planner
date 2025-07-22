class SlabHeaterGroup {
    slabHeaters = [];

    constructor(slabHeater = undefined) {
        slabHeater && this.slabHeaters.push(slabHeater);
    }

    add(slabHeater) {
        this.slabHeaters.push(slabHeater);
        slabHeater.group = this;
        slabHeater.alignment = this.slabHeaters[0].alignment;
        slabHeater.color = this.slabHeaters[0].color;
    }

    remove(slabHeater = undefined) {
        slabHeater = slabHeater || this.slabHeaters[this.slabHeaters.length - 1];
        this.slabHeaters = this.slabHeaters.filter(sh => sh !== slabHeater);
        slabHeater.group = undefined;
        slabHeaterContext.remove(slabHeater);
    }
}