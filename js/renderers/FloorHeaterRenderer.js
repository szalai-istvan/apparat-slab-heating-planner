class FloorHeaterRenderer {
    static draw(floorHeater) {
        const ratio = scaleContext.pixelsPerMetersRatio;
        const color1 = floorHeater.colors[0];
        const color2 = floorHeater.colors[1];
        const width = floorHeater.width * ratio;
        const length = floorHeater.length * ratio;
        const alignment = floorHeater.alignment;
        const centerPosition = floorHeater.isSelectedForDrag ? FloorHeaterRenderer.getCenterPosition(floorHeater, width, length) : floorHeater.centerPosition;
        const lengthFrom = - length / 2;
        const lengthTo = length / 2;
        const tubeDistance = TUBE_DISTANCE_IN_METER * ratio;
        const diameter = tubeDistance;
        const lineWeight = floorHeater.lineWeight;
        const type = floorHeater.type;
        const textSizePixels = floorHeater.textSize;
        const rectWidth = floorHeater.rectWidth;
        const rectHeight = floorHeater.rectHeight;

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
            if (roundNumber(tube, 0) > 0) {
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

        const p = FLOOR_HEATER_TEXT_POP_FACTOR;
        const pointIsInsideText = FloorHeaterManager.mouseCursorIsInsideRect(floorHeater);
        const notDragging = !floorHeater.isSelectedForDrag;

        textSize(textSizePixels * (1 + p * floorHeater.isSelected + p * (pointIsInsideText * notDragging)));
        stroke('black');
        fill('white');
        rectMode(CENTER);
        rect(0, 0, rectWidth, rectHeight);

        if (floorHeater.isSelected || (pointIsInsideText && notDragging)) {
            fill('red');
        } else {
            fill(DEFAULT_TEXT_COLOR);
        }
        noStroke();

        if (alignment > 1) {
            rotate(180);
        }
        text(type, 0, 0);

        pop();
    }

    static getCenterPosition(fh, w, h) {
        let x_;
        let y_;

        if (fh.alignment % 2 === 1) {
            x_ = w;
            y_ = h;
        } else {
            x_ = h;
            y_ = w;
        }

        const mousePosition = screenContext.getMousePosition();
        const mousePositionAbsolute = screenContext.getMousePositionAbsolute();
        const xCorrection = calculateCorrector(LEFT_RIBBON_WIDTH + (FLOOR_HEATER_CORRECTION_OFFSET + x_/2) * screenContext.zoom, mousePosition.x);
        const yCorrection = calculateCorrector(TOP_RIBBON_HEIGHT + (FLOOR_HEATER_CORRECTION_OFFSET + y_/2) * screenContext.zoom, mousePosition.y);
        return gridContext.closestGridPoint({
            x: mousePositionAbsolute.x + (xCorrection || 0),
            y: mousePositionAbsolute.y + (yCorrection || 0)
        });
    }
}