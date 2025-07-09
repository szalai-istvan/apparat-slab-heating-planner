class FloorHeaterRenderer {
    static draw(floorHeater) {
        const ratio = scaleContext.pixelsPerMetersRatio;
        const color1 = floorHeater.colors[0];
        const color2 = floorHeater.colors[1];
        const centerPosition = floorHeater.isSelectedForDrag ? screenContext.getMousePositionAbsolute() : floorHeater.centerPosition;
        const alignment = floorHeater.alignment;
        const selected = floorHeater.selected;
        const width = floorHeater.width * ratio;
        const length = floorHeater.length * ratio;
        const lengthFrom = - length / 2;
        const lengthTo = length / 2;
        const tubeDistance = TUBE_DISTANCE_IN_METER * ratio;
        const diameter = tubeDistance;

        push();

        translate(centerPosition.x, centerPosition.y);
        rotate(alignment * 90);

        let tube = - width / 2;
        let angles = [90, 270];
        while (tube <= width / 2) {
            line(lengthFrom, tube, lengthTo, tube);
            arc(lengthTo, tube + tubeDistance / 2, diameter, diameter, angles[0], angles[1]);

            angles = [angles[1], angles[0]];
            tube += tubeDistance;
        }

        pop();
    }
}