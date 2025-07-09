class BlueprintContext {

    constructor() { }

    createBlueprint(data) {
        const sizeData = blueprintContext.getSizeData();
        if (!sizeData) {
            elementStore.register(new Blueprint(data, undefined));
            screenContext.sumDrag = {x: 0, y: 0};
        } else {
            let topLeftCoordinates = {
                x: sizeData.x + sizeData.w,
                y: sizeData.y
            };
            elementStore.register(new Blueprint(data, topLeftCoordinates));
            screenContext.sumDrag = {x: -topLeftCoordinates.x, y: 0};
        }
    }

    clearBlueprints() {
        elementStore.blueprints = [];
        scaleContext.clear();
    }

    blueprintDataIsPresent() {
        const blueprints = elementStore.blueprints;

        if (blueprints.length === 0) {
            return false;
        }

        return blueprints.filter(blueprint => BlueprintManager.dataIsPresent(blueprint)).length > 0;
    }

    getSizeData() {
        if (!elementStore.blueprints.length) {
            return undefined;
        }

        if (!elementStore.blueprints.map(bp => bp.topLeftPosition).filter(x => x).length) {
            return;
        }

        const sizeDatas = elementStore.blueprints.map(bp => BlueprintManager.getSizeData(bp));
        return { 
            x: - sizeDatas[0].w / 2, 
            y: - sizeDatas[0].h / 2, 
            w: sizeDatas.map(s => s.w).reduce(sumFunction),
            h: sizeDatas.map(s => s.h).reduce(maximumFunction)
        }
    }
}

const blueprintContext = new BlueprintContext();