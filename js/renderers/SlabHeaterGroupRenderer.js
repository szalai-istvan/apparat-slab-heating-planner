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

        const pipeDriver = slabHeaterGroup.pipeDriver;
        const firstPoint = SlabHeaterGroupManager.calculatePipeDriverFirstPoint(slabHeaterGroup);
        PipeDriverManager.updateFirstPoint(pipeDriver, firstPoint);
        PipeDriverRenderer.draw(pipeDriver);
    }
}