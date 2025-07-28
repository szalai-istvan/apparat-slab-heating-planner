class SlabHeaterGroupManager {

    static addSlabHeaterToSelectedGroup() {
        const selectedGroup = slabHeaterContext?.selectedSlabHeater?.group;
        if (!selectedGroup) {
            return;
        }

        const nextPosition = SlabHeaterGroupManager.nextPosition(selectedGroup);
        const slabHeater = slabHeaterContext.createSlabHeater(true);
        slabHeater.centerPosition = nextPosition;
    }

    static removeLastFromSelectedGroup() {
        const selectedGroup = slabHeaterContext?.selectedSlabHeater?.group;
        if (!selectedGroup) {
            return;
        }
        SlabHeaterGroupManager.remove(selectedGroup);
    }

    static nextPosition(group) {
        const lastSlabHeater = group.slabHeaters[group.slabHeaters.length - 1];
        const lastCenter = lastSlabHeater.centerPosition;
        const width = lastSlabHeater.group.width;
        const horizontal = (lastSlabHeater.group.alignment % 2) === 1;

        return {
            x: lastCenter.x + horizontal * width * scaleContext.pixelsPerMetersRatio,
            y: lastCenter.y + (1 - horizontal) * width * scaleContext.pixelsPerMetersRatio
        };
    }

    static add(slabHeaterGroup, slabHeater) {
        if (!slabHeater) {
            return;
        }

        const sameId = slabHeaterGroup.slabHeaters.filter(sh => sh.id === slabHeater.id);
        if (!sameId[0]) {
            slabHeaterGroup.slabHeaters.push(slabHeater);
            slabHeater.group = slabHeaterGroup;
        }
    }

    static remove(slabHeaterGroup, slabHeater = undefined) {
        slabHeater = slabHeater || slabHeaterGroup.slabHeaters[slabHeaterGroup.slabHeaters.length - 1];
        if (!slabHeater) {
            return;
        }

        slabHeaterGroup.slabHeaters = slabHeaterGroup.slabHeaters.filter(sh => sh !== slabHeater);
        if (getClassName(slabHeater) === CLASS_SLAB_HEATER) {
            slabHeater.group = undefined;
            slabHeaterContext.remove(slabHeater);
        }
    }

    static clear(slabHeaterGroup) {
        slabHeaterGroup.slabHeaters.forEach(sh => SlabHeaterGroupManager.remove(slabHeaterGroup, sh));
    }

    static pointIsInsideRect(slabHeaterGroup) {
        if (slabHeaterGroup.pointIsInsideCache === null) {
            const selectable = slabHeaterGroup.slabHeaters.filter(sh => SlabHeaterManager.mouseCursorIsInsideRect(sh));
            slabHeaterGroup.pointIsInsideCache = selectable.length > 0;
        }

        return slabHeaterGroup.pointIsInsideCache;
    }

    static clearCache(slabHeaterGroup) {
        slabHeaterGroup.pointIsInsideCache = null;
    }

    static updatePosition(slabHeaterGroup) {
        const slabHeaters = slabHeaterGroup.slabHeaters;
        const first = slabHeaters[0];
        const firstCenterPosition = slabHeaterGroup.isSelectedForDrag ? getCenterPositionWithCorrection(first, slabHeaterGroup.width, slabHeaterGroup.length) : first.centerPosition;

        for (let index = 0; index < slabHeaters.length; index++) {
            slabHeaters[index].centerPosition = offsetCenterPosition({
                originalCenter: firstCenterPosition,
                width: slabHeaterGroup.width,
                alignment: slabHeaterGroup.alignment,
                index: index
            });
        }
    }

    static calculatePipeDriverFirstPoint(slabHeaterGroup) {
        // todo
    }
}