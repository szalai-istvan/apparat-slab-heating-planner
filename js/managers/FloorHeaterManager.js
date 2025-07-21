class SlabHeaterManager {
    static getBoundaryPoints(slabHeater) {
        const horizontalAlignment = slabHeater.alignment % 2 === 0;

        if (horizontalAlignment) {
            return {
                p1: {x: slabHeater.centerPosition.x - slabHeater.length / 2, y: slabHeater.centerPosition.y - slabHeater.width / 2},
                p2: {x: slabHeater.centerPosition.x + slabHeater.length / 2, y: slabHeater.centerPosition.y + slabHeater.width / 2}
            };
        } else {
            return {
                p1: {x: slabHeater.centerPosition.x - slabHeater.width / 2, y: slabHeater.centerPosition.y - slabHeater.length / 2},
                p2: {x: slabHeater.centerPosition.x + slabHeater.width / 2, y: slabHeater.centerPosition.y + slabHeater.length / 2}
            };
        }
    }

    static mouseCursorIsInsideRect(slabHeater) {
        if (!slabHeater.centerPosition) {
            return false;
        }

        if (slabHeater.alignment % 2 === 1) {
            return pointIsInside(
                screenContext.getMousePositionAbsolute(),
                slabHeater.centerPosition, 
                slabHeater.rectHeight,
                slabHeater.rectWidth
            );
        }
        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            slabHeater.centerPosition, 
            slabHeater.rectWidth,
            slabHeater.rectHeight
        );

    }

    static rotateSelected(direction) {
        const slabHeater = slabHeaterContext.selectedSlabHeater;
        if (!slabHeater) {
            return;
        }

        slabHeater.alignment = (slabHeater.alignment + Math.sign(direction)) % 4;
        while (slabHeater.alignment < 0) {
            slabHeater.alignment += 4;
        }
    }

    static flipSelected() {
        const slabHeater = slabHeaterContext.selectedSlabHeater;
        if (!slabHeater) {
            return;
        }

        slabHeater.colors = [slabHeater.colors[1], slabHeater.colors[0]];
    }
}