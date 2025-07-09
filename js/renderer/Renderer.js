class Renderer {
    constructor() {}

    renderTranslatedObjects() {
        elementStore.blueprints.forEach(bluePrint => BlueprintRenderer.draw(bluePrint));
        elementStore.rooms.forEach(room => RoomRenderer.draw(room));
        ScaleContextRenderer.draw(elementStore.scaleContext);
        elementStore.buttons.forEach(button => ButtonWrapperRenderer.draw(button));
        elementStore.floorHeaters.forEach(fh => FloorHeaterRenderer.draw(fh));
        
        if (debugEnabled) {
            DebugInfoRenderer.drawAxis();
        }
    }
    
    renderAbsolutePositionObjects() {
        runBetweenPushAndPop(UiBackgroundRenderer.drawUiBackground);
        TooltipRenderer.draw(elementStore.tooltip);
        elementStore.menus.forEach(menu => MenuRenderer.draw(menu));

        if (debugEnabled) {
            DebugInfoRenderer.drawCursorDebugInfo();
        }
    }
}

const renderer = new Renderer();