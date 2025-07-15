class FloorHeaterContext {
    cachedSelection = null;
    selectedFloorHeater = null;
    alignment = 1;

    createFloorHeater() {
        const width = floorHeaterWidthMenu.value;
        const length = floorHeaterLengthMenu.value;

        if (!width) {
            displayMessage('A baloldali menü segítségével válassza ki a kívánt szélességet!');
            return;
        }

        if (!length) {
            displayMessage('A baloldali menü segítségével válassza ki a kívánt hosszt!');
            return;
        }

        const floorHeater = new FloorHeater(length, width, this.alignment);
        selectionContext.selectObject(floorHeater);
    }

    clearSelectionCache() {
        this.cachedSelection = null;
    }

    select(floorHeater = undefined) {
        floorHeater = floorHeater || this.checkForSelection();
        if (!floorHeater) return;

        if (floorHeater === this.selectedFloorHeater) {
            FloorHeaterSelector.selectForDrag(floorHeater);
            return;
        }

        const successfulDeselect = this.tryToDeselect();
        if (successfulDeselect) {
            FloorHeaterSelector.select(floorHeater);
            this.selectedFloorHeater = floorHeater;
        }
    }

    tryToDeselect() {
        if (!this.selectedFloorHeater) {
            return true;
        }

        const successfulDeselect = FloorHeaterSelector.tryToDeselect(this.selectedFloorHeater);
        if (successfulDeselect) {
            this.alignment = this.selectedFloorHeater.alignment;
            this.selectedFloorHeater = null;
        }
        return successfulDeselect;
    }

    checkForSelection() {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = elementStore.floorHeaters.filter(f => FloorHeaterManager.mouseCursorIsInsideRect(f));
        const floorHeater = selection[0];
        if (floorHeater) {
            if (floorHeater !== this.selectedFloorHeater) {
                // TODO TOOLTIP
            }
            this.cachedSelection = floorHeater;
            return floorHeater;
        }

        // TODO TOOLTIP
        return undefined;
    }

    clear() {
        elementStore.floorHeaters = [];
        // TODO tooltip
    }

    removeSelected() {
        const floorHeater = this.selectedFloorHeater;
        if (floorHeater) {
            elementStore.remove(floorHeater);
            this.selectedFloorHeater = undefined;
        }
    }
}

const floorHeaterContext = new FloorHeaterContext();