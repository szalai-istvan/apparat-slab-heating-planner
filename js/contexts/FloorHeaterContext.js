class FloorHeaterContext {
    cachedSelection = null;
    selectedFloorHeater = null;
    floorHeaters = [];

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

        const floorHeater = new FloorHeater(length, width);
        this.floorHeaters.push(floorHeater);
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
            this.selectedFloorHeater = null;
        }
        return successfulDeselect;
    }

    checkForSelection() {
        // TODO
    }

    clear() {
        console.log('floorHEatingContext.clear()');
        // TODO
    }
}

const floorHeaterContext = new FloorHeaterContext();