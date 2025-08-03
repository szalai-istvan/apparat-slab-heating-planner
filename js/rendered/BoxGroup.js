class BoxGroup {
    boxes = [];
    alignment;

    isSelected;
    isSelectedForDrag;

    constructor({box, alignment}) {
        checkClass(box, CLASS_BOX, true);

        if (box) {
            this.boxes.push(boc);
        }
        this.alignment = alignment;

        elementStore.register(this);
    }
}