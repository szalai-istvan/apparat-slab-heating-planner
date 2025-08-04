function draw() {
    setCursorType();
    clearSelectionCache();

    background(BACKGROUND_COLOR);

    push();
    translateScreen();
    renderTranslatedObjects();
    pop();

    renderAbsolutePositionObjects();
}