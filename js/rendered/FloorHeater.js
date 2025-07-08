class FloorHeater {
    centerPosition;
    alignment;
    colors;
    length;
    width;
    isSelected;
    isSelectedForDrag;

    constructor(length, width) {
        this.length = length;
        this.width = width;

        this.isSelected = true;
        this.isSelectedForDrag = true;
        this.alignment = 0;

        this.colors = [RED, BLUE];

        renderer.register(this);
    }
}