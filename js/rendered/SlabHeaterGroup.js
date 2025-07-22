class SlabHeaterGroup {
    slabHeaters = [];
    pointIsInsideCache = null;
    anySelectedCache = null;

    constructor(slabHeater = undefined) {
        slabHeater && this.slabHeaters.push(slabHeater);
        elementStore.register(this);
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

    pointIsInsideRect() {
        if (this.pointIsInsideCache === null) {
            const selectable = this.slabHeaters.filter(sh => SlabHeaterManager.mouseCursorIsInsideRect(sh));
            this.pointIsInsideCache = selectable.length > 0;
        }

        return this.pointIsInsideCache;
    }

    anySelected() {
        if (this.anySelectedCache === null) {
            const selected = this.slabHeaters.filter(sh => sh.isSelected);
            this.anySelectedCache = selected.length > 0;
        }

        return this.anySelectedCache;
    }
    
    clearCache() {
        this.pointIsInsideCache = null;
        this.anySelectedCache = null;
    }
}