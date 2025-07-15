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

    static mouseCursorIsInsideRect(floorHeater) {
        if (!floorHeater.centerPosition) {
            return false;
        }

        if (floorHeater.alignment % 2 === 1) {
            return pointIsInside(
                screenContext.getMousePositionAbsolute(),
                floorHeater.centerPosition, 
                floorHeater.rectHeight,
                floorHeater.rectWidth
            );
        }
        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            floorHeater.centerPosition, 
            floorHeater.rectWidth,
            floorHeater.rectHeight
        );

    }

    static rotateSelected(direction) {
        const floorHeater = floorHeaterContext.selectedFloorHeater;
        if (!floorHeater) {
            return;
        }

        floorHeater.alignment = (floorHeater.alignment + Math.sign(direction)) % 4;
        while (floorHeater.alignment < 0) {
            floorHeater.alignment += 4;
        }
    }

    static flipSelected() {
        const floorHeater = floorHeaterContext.selectedFloorHeater;
        if (!floorHeater) {
            return;
        }

        floorHeater.colors = [floorHeater.colors[1], floorHeater.colors[0]];
    }
}