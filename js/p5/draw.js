function draw() {
    elementStore.slabHeaterGroups.forEach(shg => SlabHeaterGroupManager.clearCache(shg));
    selectionContext.clearSelectionCache();

    background(BACKGROUND_COLOR);

    renderTranslatedObjects();

    selectionContext.checkForSelection();
    renderer.renderAbsolutePositionObjects();
}

function renderTranslatedObjects() {
    push();
    screenContext.translate();
    renderer.renderTranslatedObjects();
    pop();
}
