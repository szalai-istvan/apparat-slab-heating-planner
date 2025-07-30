class Renderer {
    constructor() {}

    renderTranslatedObjects() {
        elementStore.blueprints.forEach(bluePrint => BlueprintRenderer.draw(bluePrint));
        elementStore.rooms.forEach(room => RoomRenderer.draw(room));
        ScaleContextRenderer.draw(elementStore.scaleContext);
        elementStore.buttons.forEach(button => ButtonWrapperRenderer.draw(button));
        elementStore.slabHeaterGroups.forEach(shg => SlabHeaterGroupRenderer.draw(shg));
        
        if (debugEnabled) {
            DebugInfoRenderer.drawAxis();
        }
    }

    renderAbsolutePositionObjects() {
        UiBackgroundRenderer.drawUiBackground();
        TooltipRenderer.draw(elementStore.tooltip);
        elementStore.menus.forEach(menu => MenuRenderer.draw(menu));
        elementStore.optionsBars.forEach(opt => OptionsBarRenderer.draw(opt));

        if (debugEnabled) {
            DebugInfoRenderer.drawCursorDebugInfo();
        }
    }
}

const renderer = new Renderer();