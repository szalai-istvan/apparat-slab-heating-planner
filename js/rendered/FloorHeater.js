class FloorHeater {
    centerPosition;
    alignment;
    colorOrder;
    selected;
    length;
    width;

    constructor(length, width) {
        this.length = length;
        this.width = width;

        this.selected = true;
        this.alignment = 0;

        this.colorOrder = [RED, BLUE];

        renderer.register(this);
    }
}