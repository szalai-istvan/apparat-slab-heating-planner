class Renderer {
    floorHeaters = [];
    bluePrints = [];
    rooms = [];
    beams = [];
    buttons = [];

    scaleContext = null;
    tooltip = null;

    constructor() { }

    register(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === 'FloorHeater') {
            this.floorHeaters.push(obj);
        } else if (className === 'Blueprint') {
            this.bluePrints.push(obj);
        } else if (className === 'Room') {
            this.rooms.push(obj);
        } else if (className === 'ScaleContext') {
            this.scaleContext = obj;
        } else if (className === 'ButtonWrapper') {
            this.buttons.push(obj);
        } else if (className === 'Tooltip') {
            this.tooltip = obj;
        } else {
            throw new Error(`Attempt to register unexpected render type: ${className}`);
        }
    }

    renderTranslatedObjects() {
        this.bluePrints.forEach(bluePrint => BlueprintRenderer.draw(bluePrint));
        this.rooms.forEach(room => RoomRenderer.draw(room));
        ScaleContextRenderer.draw(this.scaleContext);
        this.buttons.forEach(button => ButtonWrapperRenderer.draw(button));

        if (debugEnabled) {
            DebugInfoRenderer.drawAxis();
        }
    }

    renderAbsolutePositionObjects() {
        runBetweenPushAndPop(UiBackgroundRenderer.drawUiBackground);
        TooltipRenderer.draw(this.tooltip);

        if (debugEnabled) {
            DebugInfoRenderer.drawCursorDebugInfo();
        }
    }

    remove(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === 'Room') {
            this.rooms = this.rooms.filter(x => x !== obj);
        } else if (className === 'Blueprint') {
            this.bluePrints = this.bluePrints.filter(x => x !== obj);
        } else {
            throw new Error(`Deleting render object of type ${className} is unspecified.`);
        }
    }
}

const renderer = new Renderer();