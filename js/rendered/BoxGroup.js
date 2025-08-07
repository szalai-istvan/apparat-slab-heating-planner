class BoxGroup {
    boxes = [];
    alignment;

    cursorIsInsideCache = null;
    clickedMemberIndex;
    isSelected;
    isSelectedForDrag;

    pipeDriver = null;
    pipeDriverEndNodeCoordinates = null;

    constructor({box, alignment}) {
        checkClass(box, CLASS_BOX, true);

        if (box) {
            this.boxes.push(box);
            box.group = this;
        }
        this.alignment = alignment;

        elementStore.register(this);
    }
}