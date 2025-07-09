class RoomContext {
    cachedSelection = null;
    selectedRoom = null;

    constructor() {}

    tryToCreateRoom(name) {
        name = name.trim();

        if (this.roomNameAlreadyExists(name)) {
            displayMessage(`${name} nevű szoba már létezik. Egyedi nevet kell megadni.`);
            return false;
        }
        const room = new Room(name);
        elementStore.register(room);

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
            elementStore.remove(room);
            this.selectedRoom = undefined;
        }
        if (elementStore.rooms.length === 0) {
            tooltip.scalingFinished();
            gridContext.removeSeed();
        }
    }

    checkForSelection() {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = elementStore.rooms.filter(r => RoomManager.mouseCursorIsInsideName(r));
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
        elementStore.rooms = [];
        selectionContext.tryToDeselect();
        floorHeaterContext.clear();
    }

    addPoint() {
        const selectedRoom = this.selectedRoom;
        if (selectedRoom && !RoomManager.roomIsConfigured(selectedRoom)) {
            if (this.pointIsValid()) {
                RoomManager.addPoint(selectedRoom);
                if (elementStore.rooms.length === 1 && selectedRoom.points.length === 1) {
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
        return elementStore.rooms.length > 0 && RoomManager.roomIsConfigured(elementStore.rooms[0]);
    }

    getRoomContainingPoint(point) {
        const room = elementStore.rooms.filter(r => RoomManager.pointIsInsideRoom(r, point))[0];
        if (room) {
            return room.name;
        }
        return null;
    }

    getRoomNames() {
        return elementStore.rooms.map(r => r.name);
    }

    roomNameAlreadyExists(name) {
        return elementStore.rooms.map(room => room.name.toLowerCase()).includes(name.toLowerCase());
    }

    pointIsValid() {
        if (elementStore.rooms.length < 2) {
            return true;
        }

        const pointIsNotInAnyRooms = elementStore.rooms.filter(r => RoomManager.pointIsInsideRoom(r)).length === 0;
        if (!pointIsNotInAnyRooms) {
            return false;
        }
        return true;
    }

    registerRelocatedFloorHeatingAndReturnContainingRoom(floorHeater) {
        const boundaryPoints = FloorHeaterManager.getBoundaryPoints(floorHeater);
        const p1 = boundaryPoints.p1;
        const p2 = boundaryPoints.p2;

        const room = elementStore.rooms.filter(r => RoomManager.pointIsInsideRoom(r, p1) && RoomManager.pointIsInsideRoom(r, p2))[0];
        if (!room) {
            displayMessage('A padlófűtő elem része vagy egésze szobán kívül van!<br/>Helyezze el máshová!');    
            return undefined;
        }

        /*const successfulRegister = RoomManager.tryToRegisterPanelGroup(room, panel);
        if (!successfulRegister) {
            displayMessage('Egy adott szobában nem helyezhet el különböző irányban álló paneleket!');
            return undefined;
        } TODO Ez kell vajon? */ 

        return room;
    }
}

const roomContext = new RoomContext();