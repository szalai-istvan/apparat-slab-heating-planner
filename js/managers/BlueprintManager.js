class BlueprintManager____ {
        
    static getSizeData(blueprint) {
        const data = blueprint.data;

        return { x: blueprint.topLeftPosition.x, y: blueprint.topLeftPosition.y, w: data.width, h: data.height };
    }
}