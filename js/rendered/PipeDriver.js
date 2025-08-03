class PipeDriver {
    points = [];

    constructor(firstPoint) {
        firstPoint && this.points.push(firstPoint);

        elementStore.register(this);
    }
}