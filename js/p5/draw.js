function draw() {
    clearSelectionCache();

    background(BACKGROUND_COLOR);

    push();
    translateScreen();
    renderTranslatedObjects();
    pop();

    //selectionContext.checkForSelection();
    renderAbsolutePositionObjects();
}