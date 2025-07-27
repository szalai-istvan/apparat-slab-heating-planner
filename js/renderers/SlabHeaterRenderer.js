class SlabHeaterRenderer {
    static draw(slabHeater) {
        const ratio = scaleContext.pixelsPerMetersRatio;
        const color = slabHeater.group.color;
        const width = slabHeater.group.width * ratio;
        const length = slabHeater.group.length * ratio;
        const alignment = slabHeater.group.alignment;
        const centerPosition = slabHeater.isSelectedForDrag ? SlabHeaterRenderer.getCenterPosition(slabHeater, width, length) : slabHeater.centerPosition;
        const lengthFrom = - length / 2;
        const lengthTo = length / 2;
        const tubeDistance = TUBE_DISTANCE_IN_METER * ratio;
        const diameter = tubeDistance;
        const lineWeight = slabHeater.lineWeight;
        const type = slabHeater.group.type;
        const textSizePixels = slabHeater.textSize;
        const rectWidth = slabHeater.rectWidth;
        const rectHeight = slabHeater.rectHeight;
        const isSelected = SlabHeaterGroupManager.anySelected(slabHeater.group);

        push();

        translate(centerPosition.x, centerPosition.y);
        rotate(alignment * 90);

        strokeWeight(lineWeight);
        noFill();

        let tube = - width / 2 + tubeDistance/2;
        let angles = [270, 90];
        let arcX = lengthTo;
        stroke(color);
        while (tube < width / 2 - tubeDistance/2) {
            line(lengthFrom, tube, 0, tube);
            line(0, tube, lengthTo, tube);
            arc(arcX, tube + tubeDistance / 2, diameter, diameter, angles[0], angles[1]);

            angles = [angles[1], angles[0]];
            arcX *= -1;
            tube += tubeDistance;
        }
        line(lengthFrom, tube, lengthTo, tube);

        textAlign(CENTER, CENTER);

        const p = SLAB_HEATER_TEXT_POP_FACTOR;
        const pointIsInsideRect = SlabHeaterGroupManager.pointIsInsideRect(slabHeater.group);
        const notDragging = !slabHeater.isSelectedForDrag;

        textSize(textSizePixels * (1 + p * isSelected + p * (pointIsInsideRect * notDragging)));
        stroke(BLACK);
        fill('white');
        rectMode(CENTER);
        rect(0, 0, rectWidth, rectHeight);

        if (isSelected || (pointIsInsideRect && notDragging)) {
            fill(SELECTED_TEXT_COLOR);
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
        const xCorrection = calculateCorrector(LEFT_RIBBON_WIDTH + (SLAB_HEATER_CORRECTION_OFFSET + x_/2) * screenContext.zoom, mousePosition.x);
        const yCorrection = calculateCorrector(TOP_RIBBON_HEIGHT + (SLAB_HEATER_CORRECTION_OFFSET + y_/2) * screenContext.zoom, mousePosition.y);
        return gridContext.closestGridPoint({
            x: mousePositionAbsolute.x + (xCorrection || 0),
            y: mousePositionAbsolute.y + (yCorrection || 0)
        });
    }
}