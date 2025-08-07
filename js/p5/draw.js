function draw() {
    if (saveInProgress) {
        return;
    }

    setCursorType();
    clearSelectionCache();

    background(BACKGROUND_COLOR);

    push();
    translateScreen();
    renderTranslatedObjects();
    pop();

    renderAbsolutePositionObjects();
}