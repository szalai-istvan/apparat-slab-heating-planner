class SlabHeater {
    id;
    centerPosition;
    lineWeight;
    textSize;
    padding;
    rectWidth;
    rectHeight;
    group;
    
    constructor() {
        this.id = Math.random().toString().substring(2);

        this.lineWeight = SLAB_HEATER_LINE_WEIGHT_IN_METER * scaleContext.pixelsPerMetersRatio;
        this.textSize = SLAB_HEATER_TEXT_SIZE_IN_METER * scaleContext.pixelsPerMetersRatio;

        this.padding = SLAB_HEATER_TYPE_RECT_PADDING_IN_METER * scaleContext.pixelsPerMetersRatio;

        textSize(this.textSize);
        this.rectWidth = textWidth(this.type) + this.padding;
        this.rectHeight = this.textSize + this.padding;
        
        elementStore.register(this);
    }
}