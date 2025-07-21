class SlabHeaterContext {
    cachedSelection = null;
    selectedSlabHeater = null;
    alignment = 1;

    createSlabHeater() {
        const width = slabHeaterWidthMenu.value;
        const length = slabHeaterLengthMenu.value;

        if (!width) {
            displayMessage('A baloldali menü segítségével válassza ki a kívánt szélességet!');
            return;
        }

        if (!length) {
            displayMessage('A baloldali menü segítségével válassza ki a kívánt hosszt!');
            return;
        }

        const slabHeater = new SlabHeater(length, width, this.alignment);
        selectionContext.selectObject(slabHeater);
    }

    clearSelectionCache() {
        this.cachedSelection = null;
    }

    select(slabHeater = undefined) {
        slabHeater = slabHeater || this.checkForSelection();
        if (!slabHeater) return;

        if (slabHeater === this.selectedSlabHeater) {
            SlabHeaterSelector.selectForDrag(slabHeater);
            return;
        }

        const successfulDeselect = this.tryToDeselect();
        if (successfulDeselect) {
            SlabHeaterSelector.select(slabHeater);
            this.selectedSlabHeater = slabHeater;
        }
    }

    tryToDeselect() {
        if (!this.selectedSlabHeater) {
            return true;
        }

        const successfulDeselect = SlabHeaterSelector.tryToDeselect(this.selectedSlabHeater);
        if (successfulDeselect) {
            this.alignment = this.selectedSlabHeater.alignment;
            this.selectedSlabHeater = null;
        }
        return successfulDeselect;
    }

    checkForSelection() {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = elementStore.slabHeaters.filter(f => SlabHeaterManager.mouseCursorIsInsideRect(f));
        const slabHeater = selection[0];
        if (slabHeater) {
            if (slabHeater !== this.selectedSlabHeater) {
                // TODO TOOLTIP
            }
            this.cachedSelection = slabHeater;
            return slabHeater;
        }

        // TODO TOOLTIP
        return undefined;
    }

    clear() {
        elementStore.slabHeaters = [];
        // TODO tooltip
    }

    removeSelected() {
        const slabHeater = this.selectedSlabHeater;
        if (slabHeater) {
            elementStore.remove(slabHeater);
            this.selectedSlabHeater = undefined;
        }
    }
}

const slabHeaterContext = new SlabHeaterContext();