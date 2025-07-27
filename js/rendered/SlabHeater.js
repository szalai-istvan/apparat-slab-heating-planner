class SlabHeater {
    id;
    centerPosition;
    isSelected;
    isSelectedForDrag;
    lineWeight;
    textSize;
    padding;
    rectWidth;
    rectHeight;
    group;
    
    constructor(length, width, alignment = undefined) {
        this.id = Math.random().toString().substring(2);

        this.isSelected = false;
        this.isSelectedForDrag = false;

        this.lineWeight = SLAB_HEATER_LINE_WEIGHT_IN_METER * scaleContext.pixelsPerMetersRatio;
        this.textSize = SLAB_HEATER_TEXT_SIZE_IN_METER * scaleContext.pixelsPerMetersRatio;

        this.padding = SLAB_HEATER_TYPE_RECT_PADDING_IN_METER * scaleContext.pixelsPerMetersRatio;

        textSize(this.textSize);
        this.rectWidth = textWidth(this.type) + this.padding;
        this.rectHeight = this.textSize + this.padding;
        
        elementStore.register(this);
    }
}