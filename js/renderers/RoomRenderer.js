class RoomRenderer____ {

    static draw(room) {
        if (getClassName(room) !== 'Room') {
            throw new Error('RoomRenderer can only render Rooms!');
        }
        const points = getPointsToDrawRoom(room);
        const length = points.length;

        if (length < 2) {
            return;
        }

        push();
        RoomRenderer.updateSettingsToDraw(room);

        for (let index = 0; index < length; index++) {
            const p1 = points[index];
            const p2 = points[(index + 1) % length];

            line(p1.x, p1.y, p2.x, p2.y);
        }

        const p1 = points[0];
        const p2 = points[2];
        noStroke();
        fill('#FFFFFFA0');
        rect(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y), Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y));

        pop();
        const textCenterCoordinates = room.isSelected ? getMousePositionAbsolute() : room.textCenterCoordinates;
        if (RoomManager.roomIsConfigured(room)) {
            push();
            RoomRenderer.updateSettingsToText(room);
            text(room.name, textCenterCoordinates.x, textCenterCoordinates.y);
            pop();
        }

        RoomRenderer.drawRoomSize(room, points);
    }
}