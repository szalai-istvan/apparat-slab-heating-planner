class SlabHeater {
    id;
    centerPosition;
    alignment;
    color;
    length;
    width;
    isSelected;
    isSelectedForDrag;
    lineWeight;
    textSize;
    padding;
    type;
    rectWidth;
    rectHeight;
    group;

    constructor(length, width, alignment = undefined) {
        this.id = Math.random().toString().substring(2);
        this.length = length;
        this.width = width;

        this.isSelected = false;
        this.isSelectedForDrag = false;
        this.alignment = alignment ?? 1;

        this.color = BLACK;
        this.lineWeight = SLAB_HEATER_LINE_WEIGHT_IN_METER * scaleContext.pixelsPerMetersRatio;
        this.textSize = SLAB_HEATER_TEXT_SIZE_IN_METER * scaleContext.pixelsPerMetersRatio;

        this.padding = SLAB_HEATER_TYPE_RECT_PADDING_IN_METER * scaleContext.pixelsPerMetersRatio;
        this.type = width.toString().replace('.', ',') + ' m x ' + length.toString().replace('.', ',') + ' m';

        textSize(this.textSize);
        this.rectWidth = textWidth(this.type) + this.padding;
        this.rectHeight = this.textSize + this.padding;
        
        elementStore.register(this);
    }
}