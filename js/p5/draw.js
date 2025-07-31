function draw() {
    elementStore.slabHeaterGroups.forEach(shg => SlabHeaterGroupManager.clearCache(shg));
    clearSelectionCache();

    background(BACKGROUND_COLOR);

    push();
    translateScreen();
    renderTranslatedObjects();
    pop();

    //selectionContext.checkForSelection();
    renderAbsolutePositionObjects();
}