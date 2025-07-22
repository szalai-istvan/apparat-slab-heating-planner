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

        selectedGroup.remove();
    }

    static nextPosition(group) {
        const lastSlabHeater = group.slabHeaters[group.slabHeaters.length - 1];
        const lastCenter = lastSlabHeater.centerPosition;
        const width = lastSlabHeater.width;
        const horizontal = (lastSlabHeater.alignment % 2) === 1;

        return {
            x: lastCenter.x + horizontal * width * scaleContext.pixelsPerMetersRatio,
            y: lastCenter.y + (1 - horizontal) * width * scaleContext.pixelsPerMetersRatio
        };
    }
}