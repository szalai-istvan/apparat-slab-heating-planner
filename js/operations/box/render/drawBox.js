/**
 * Felrajzolja a paraméterül kapott dobozt a képernyőre
 * 
 * @param {Box} box
 * @returns {undefined}
 */
function drawBox(box) {
    checkClass(box, CLASS_BOX);

    const center = box.centerPosition;
    const alignment = getBoxGroupById(box.groupId).alignment;
    const width = BOX_WIDTH_IN_METERS * pixelsPerMetersRatio;
    const length = BOX_LENGTH_IN_METERS * pixelsPerMetersRatio;

    if (!center) {
        return;
    }

    push();

    translate(center.x, center.y);
    rotate(alignment * 90);
    rectMode(CENTER);
    fill(WHITE);
    rect(0, 0, width, length);

    pop();
}