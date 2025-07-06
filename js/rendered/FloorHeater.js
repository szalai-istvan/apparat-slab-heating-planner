class FloorHeater {
    centerPosition;
    alignment;
    colors;
    selected;
    length;
    width;

    constructor(length, width) {
        this.length = length;
        this.width = width;

        this.selected = true;
        this.alignment = 0;

        this.colors = [RED, BLUE];

        renderer.register(this);
    }
}