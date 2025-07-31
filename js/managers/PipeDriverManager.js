class PipeDriverManager____ {
    static updateFirstPoint(pipeDriver, firstPoint) {
        const points = pipeDriver.points;
        if (!firstPoint) {
            return;
        }

        if (points.length === 0) {
            points.push(firstPoint);
        } else {
            points[0] = firstPoint;
        }
    }
}