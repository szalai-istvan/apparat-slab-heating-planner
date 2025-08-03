class Box {
    centerPosition;
    group;
    
    cursorIsInsideCache = null;

    constructor(centerPosition) {
        this.centerPosition = centerPosition;
        elementStore.register(this);
    }
}