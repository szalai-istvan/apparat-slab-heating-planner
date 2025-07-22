class SlabHeaterContext {
    cachedSelection = null;
    selectedSlabHeater = null;
    alignment = 1;

    createSlabHeater(addToGroup) {
        const width = slabHeaterWidthOptionsBar.getValue();
        const length = slabHeaterLengthOptionsBar.getValue();

        if (!width) {
            displayMessage('A baloldali menü segítségével válassza ki a kívánt szélességet!');
            return;
        }

        if (!length) {
            displayMessage('A baloldali menü segítségével válassza ki a kívánt hosszt!');
            return;
        }

        const slabHeater = new SlabHeater(length, width, this.alignment);

        if (this.selectedSlabHeater && addToGroup) {
            this.selectedSlabHeater.group.add(slabHeater);
        } else {
            slabHeater.group = new SlabHeaterGroup(slabHeater);

            selectionContext.selectObject(slabHeater);
            slabHeater.isSelected = true;
            slabHeater.isSelectedForDrag = true;
        }

        return slabHeater;
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
            slabHeaterWidthOptionsBar.setValue(0, slabHeater.width.toString());
            const meter = Math.floor(slabHeater.length).toString();
            const cm = (Math.floor(roundNumber(slabHeater.length - Math.floor(slabHeater.length), 2) * 100)).toString();
            slabHeaterLengthOptionsBar.setValue(0, meter);
            slabHeaterLengthOptionsBar.setValue(1, cm);
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

    remove(slabHeater) {
        if (slabHeater) {
            elementStore.remove(slabHeater);
        }
    }
}

const slabHeaterContext = new SlabHeaterContext();