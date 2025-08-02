function mousePressed() {
    if (!controlsAreEnabled) {
        return;
    }

    if (mouseY < TOP_RIBBON_HEIGHT) {
        return;
    }

    if (mouseX < LEFT_RIBBON_WIDTH) {
        return;
    }

    if (mouseButton === 'right') {
        rightMouseButtonPressedFunc();
    } else if (mouseButton === 'left') {
        leftMouseButtonPressedFunc()
    }
}

function leftMouseButtonPressedFunc() {
    startDragging();
    searchSelectableObject();
}

function rightMouseButtonPressedFunc() {
    addScalingReferencePoint();
    addPointToSelectedRoom();

    deselectObject();
}