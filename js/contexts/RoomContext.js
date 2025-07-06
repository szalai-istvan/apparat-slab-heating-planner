class RoomContext {
    cachedSelection = null;
    selectedRoom = null;
    rooms = [];

    constructor() {}

    tryToCreateRoom(name) {
        name = name.trim();

        if (this.roomNameAlreadyExists(name)) {
            displayMessage(`${name} nevű szoba már létezik. Egyedi nevet kell megadni.`);
            return false;
        }
        const room = new Room(name);
        this.rooms.push(room);

        tooltip.roomAddingStarted();
        selectionContext.selectObject(room);
        return true;
    }
    
    select(room = undefined) {
        room = room || this.checkForSelection();
        if (!room) return;

        this.tryToDeselect();
        RoomSelector.select(room);
        this.selectedRoom = room;

        if (RoomManager.roomIsConfigured(room)) {
            tooltip.roomSelected();
        }
    }
    
    tryToDeselect() {
        if (this.selectedRoom && RoomManager.roomIsConfigured(this.selectedRoom)) {
            RoomSelector.tryToDeselect(this.selectedRoom);
            this.selectedRoom = null;
            tooltip.roomDeselected();
        }
        return true;
    }
    
    removeSelected() {
        const room = this.selectedRoom;
        if (room) {
            RoomSelector.remove(room);
            this.rooms = this.rooms.filter(r => r !== room);
            this.selectedRoom = undefined;
        }
        if (this.rooms.length === 0) {
            tooltip.scalingFinished();
            gridContext.removeSeed();
        }
    }

    checkForSelection() {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = this.rooms.filter(r => RoomManager.mouseCursorIsInsideName(r));
        const room = selection[0];
        if (room) {
            if (room !== this.selectedRoom) {
                tooltip.roomNameHovered();
            }
            this.cachedSelection = room;
            return room;
        }
        tooltip.roomNameUnhovered();
    }

    clearSelectionCache() {
        this.cachedSelection = null;
    }

    clear() {
        this.rooms.forEach(room => RoomSelector.remove(room));
        this.rooms = [];
        selectionContext.tryToDeselect();
        floorHeaterContext.clear();
    }

    addPoint() {
        const selectedRoom = this.selectedRoom;
        if (selectedRoom && !RoomManager.roomIsConfigured(selectedRoom)) {
            if (this.pointIsValid()) {
                RoomManager.addPoint(selectedRoom);
                if (this.rooms.length === 1 && selectedRoom.points.length === 1) {
                    gridContext.setSeed(screenContext.getMousePositionAbsolute());
                }
            } else {
                displayMessage('A pont felvétele átfedést okozna a szobák között. Válasszon másik pontot.');
            }    
        }
    }

    selectedRoomIsConfiguredOrNoRoomIsSelected() {
        if (!this.selectedRoom) {
            return true;
        }

        return RoomManager.roomIsConfigured(this.selectedRoom);
    }

    displayDeleteButton() {
        return this.selectedRoom && RoomManager.roomIsConfigured(this.selectedRoom);
    }

    thereAreRooms() {
        return this.rooms.length > 0 && RoomManager.roomIsConfigured(this.rooms[0]);
    }

    getRoomContainingPoint(point) {
        const room = this.rooms.filter(r => RoomManager.pointIsInsideRoom(r, point))[0];
        if (room) {
            return room.name;
        }
        return null;
    }

    getRoomNames() {
        return this.rooms.map(r => r.name);
    }

    roomNameAlreadyExists(name) {
        return this.rooms.map(room => room.name.toLowerCase()).includes(name.toLowerCase());
    }

    pointIsValid() {
        if (this.rooms.length < 2) {
            return true;
        }

        const pointIsNotInAnyRooms = this.rooms.filter(r => RoomManager.pointIsInsideRoom(r)).length === 0;
        if (!pointIsNotInAnyRooms) {
            return false;
        }
        return true;
    }
}

const roomContext = new RoomContext();