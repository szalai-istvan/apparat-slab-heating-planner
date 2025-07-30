function drawScaler() {
    if (!scalingInProgress) {
        return;
    }

    const firstPoint = scalingFirstPoint;
    if (!firstPoint) {
        return;
    }

    const secondPoint = scalingSecondPoint || screenContext.getMousePositionAbsolute();

    push();

    line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);

    pop();
}