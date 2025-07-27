function draw() {
    elementStore.slabHeaterGroups.forEach(shg => SlabHeaterGroupManager.clearCache(shg));
    selectionContext.clearSelectionCache();

    background(BACKGROUND_COLOR);

    runBetweenPushAndPop(renderTranslatedObjects);

    selectionContext.checkForSelection();
    renderer.renderAbsolutePositionObjects();
}

function renderTranslatedObjects() {
    screenContext.translate();
    renderer.renderTranslatedObjects();
}
