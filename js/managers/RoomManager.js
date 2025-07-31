class RoomManager____ {  
    static getArea(room) {
        return RoomManager.getWidthInMeters(room) * RoomManager.getHeightInMeters(room);
    }

    static getCircumference(room) {
        return 2 * (RoomManager.getWidthInMeters(room) + RoomManager.getHeightInMeters(room));
    }
}