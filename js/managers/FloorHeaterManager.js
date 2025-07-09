class FloorHeaterManager {
    static getBoundaryPoints(floorHeater) {
        const horizontalAlignment = floorHeater.alignment % 2 === 0;

        if (horizontalAlignment) {
            return {
                p1: {x: floorHeater.centerPosition.x - floorHeater.length / 2, y: floorHeater.centerPosition.y - floorHeater.width / 2},
                p2: {x: floorHeater.centerPosition.x + floorHeater.length / 2, y: floorHeater.centerPosition.y + floorHeater.width / 2}
            };
        } else {
            return {
                p1: {x: floorHeater.centerPosition.x - floorHeater.width / 2, y: floorHeater.centerPosition.y - floorHeater.length / 2},
                p2: {x: floorHeater.centerPosition.x + floorHeater.width / 2, y: floorHeater.centerPosition.y + floorHeater.length / 2}
            };
        }
    }
}