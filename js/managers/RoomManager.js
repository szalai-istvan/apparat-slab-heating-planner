class RoomManager {



    static roomIsConfigured(room) {
        return room.points.length === 2;
    }

    
    static mouseCursorIsInsideName(room) {
        if (room.points.length < 2) {
            return false;
        }

        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            room.textCenterCoordinates, 
            textWidth(room.name),
            room.textSize
        );
    }

    static getWidthInMeters(room, points = undefined) {
        points = points || room.points;

        const maxX = points.map(p => p.x).reduce(maximumFunction);
        const minX = points.map(p => p.x).reduce(minimumFunction);

        return (maxX - minX) / scaleContext.pixelsPerMetersRatio;
    }

    static getHeightInMeters(room, points = undefined) {
        points = points || room.points;

        const maxY = points.map(p => p.y).reduce(maximumFunction);
        const minY = points.map(p => p.y).reduce(minimumFunction);

        return (maxY - minY) / scaleContext.pixelsPerMetersRatio;
    }

        
    static getMiddlePoint(room, points = undefined) {
        points = points || RoomRenderer.getPointsToDraw(room);
        const length = points.length;
        if (length === 0) {
            return;
        }

        const x = points.map(p => p.x).reduce((a, b) => a + b) / length;
        const y = points.map(p => p.y).reduce((a, b) => a + b) / length;

        return {x, y};
    }

    static getArea(room) {
        return RoomManager.getWidthInMeters(room) * RoomManager.getHeightInMeters(room);
    }

    static getCircumference(room) {
        return 2 * (RoomManager.getWidthInMeters(room) + RoomManager.getHeightInMeters(room));
    }

}