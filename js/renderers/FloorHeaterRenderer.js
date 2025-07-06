class FloorHeaterRenderer {
    static draw(floorHeater) {
        const ratio = scaleContext.pixelsPerMetersRatio;
        const color1 = floorHeater.colors[0];
        const color2 = floorHeater.colors[1];
        const centerPosition = floorHeater.centerPosition;
        const alignment = floorHeater.alignment;
        const selected = floorHeater.selected;
        const width = floorHeater.width * ratio;
        const length = floorHeater.length * ratio;
        const lengthFrom = - length / 2;
        const lengthTo = length / 2;
        const tubeDistance = TUBE_DISTANCE_IN_METER * ratio;

        push();

        translate(centerPosition.x, centerPosition.y);
        rotate(alignment * 90);

        let tube = - width / 2;
        while (tube <= width / 2) {
            line(lengthFrom, tube, lengthTo, tube);
            tube += tubeDistance;
        }

        pop();
    }
}