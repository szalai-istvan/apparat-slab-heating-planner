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
        const lineWeight = floorHeater.lineWeight;
        const textSizePixels = floorHeater.textSize;
        const padding = floorHeater.padding;
        const type = floorHeater.type;
        const typeWidth = textWidth(type);

        push();

        translate(centerPosition.x, centerPosition.y);
        rotate(alignment * 90);

        strokeWeight(lineWeight);
        noFill();

        let tube = - width / 2;
        let angles = [270, 90];
        let arcX = lengthTo;
        stroke(color1);
        while (tube < width / 2) {
            line(lengthFrom, tube, 0, tube);
            if (roundNumber(tube, 0) === 0) {
                stroke(color2);
            }
            line(0, tube, lengthTo, tube);
            arc(arcX, tube + tubeDistance / 2, diameter, diameter, angles[0], angles[1]);

            angles = [angles[1], angles[0]];
            arcX *= -1;
            tube += tubeDistance;
        }
        line(lengthFrom, tube, lengthTo, tube);

        textAlign(CENTER, CENTER);
        textSize(textSizePixels);
        stroke('black');
        fill('white');
        rectMode(CENTER);
        rect(0, 0, typeWidth + padding, textSizePixels + padding);
        fill(DEFAULT_TEXT_COLOR);
        noStroke();
        text(type, 0, 0);

        pop();
    }
}