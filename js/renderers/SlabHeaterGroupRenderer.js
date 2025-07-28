class SlabHeaterGroupRenderer {
    static draw(slabHeaterGroup) {
        const slabHeaters = slabHeaterGroup.slabHeaters;
        if (slabHeaterGroup.isSelectedForDrag) {
            SlabHeaterGroupManager.updatePosition(slabHeaterGroup);
        }

        for (let i = 0; i < slabHeaters.length; i++) {
            const slabHeater = slabHeaters[i];

            SlabHeaterRenderer.draw(slabHeater);
        }
    }
}