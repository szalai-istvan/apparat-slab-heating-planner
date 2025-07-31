class PipeDriverRenderer____ {

    static draw(pipeDriver) {
        const ratio = pixelsPerMetersRatio;

        const lineThickness = PIPE_DRIVER_PIPE_THICKNESS_IN_METERS * ratio;
        const diameter = PIPE_DRIVER_DIAMETER_IN_METERS * ratio;
        const ellipseThickness = PIPE_DRIVER_THICKNESS_IN_METERS * ratio;

        const points = pipeDriver.points;

        push();

        stroke(PIPE_DRIVER_PIPE_COLOR);
        strokeWeight(lineThickness);
        
        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            line(p1.x, p1.y, p2.x, p2.y);
        }
        
        fill(PIPE_DRIVER_DEFAULT_FILL_COLOR);
        stroke(PIPE_DRIVER_OUTLINE_COLOR);
        strokeWeight(ellipseThickness);
        ellipseMode(CENTER);

        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            ellipse(p.x, p.y, diameter, diameter);
        }

        pop();
    }
}