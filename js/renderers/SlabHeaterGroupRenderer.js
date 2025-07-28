class SlabHeaterGroupRenderer {
    static draw(slabHeaterGroup) {
        const slabHeaters = slabHeaterGroup.slabHeaters;
        const first = slabHeaters[0];
        const firstCenterPosition = slabHeaterGroup.isSelectedForDrag ? getCenterPositionWithCorrection(first, slabHeaterGroup.width, slabHeaterGroup.length) : first.centerPosition;

        for (let i = 0; i < slabHeaters.length; i++) {
            const slabHeater = slabHeaters[i];
            SlabHeaterGroupRenderer.updatePosition(slabHeaterGroup, slabHeater, i, firstCenterPosition);

            SlabHeaterRenderer.draw(slabHeater);
        }
    }

    static updatePosition(slabHeaterGroup, slabHeater, index, firstCenterPosition) {
        if (!slabHeaterGroup.isSelectedForDrag) {
            return;
        }

        slabHeater.centerPosition = offsetCenterPosition({
            originalCenter: firstCenterPosition, 
            width: slabHeaterGroup.width, 
            alignment: slabHeaterGroup.alignment, 
            index: index
        });
    }
}