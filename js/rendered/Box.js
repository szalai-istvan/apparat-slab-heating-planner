class Box {
    centerPosition;
    group;

    constructor(centerPosition) {
        this.centerPosition = centerPosition;
        elementStore.register(this);
    }
}