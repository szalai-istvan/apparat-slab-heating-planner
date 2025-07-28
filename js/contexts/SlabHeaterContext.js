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

        const slabHeater = new SlabHeater();

        if (this.selectedSlabHeater && addToGroup) {
            SlabHeaterGroupManager.add(this.selectedSlabHeater.group, slabHeater);
        } else {
            const alignment = this.alignment;
            const group = new SlabHeaterGroup({slabHeater, length, width, alignment});

            selectionContext.selectObject(slabHeater);
            group.isSelected = true;
            group.isSelectedForDrag = true;
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
            slabHeaterWidthOptionsBar.setValue(0, slabHeater.group.width.toString());
            const meter = Math.floor(slabHeater.group.length).toString();
            const cm = (Math.floor(roundNumber(slabHeater.group.length - Math.floor(slabHeater.group.length), 2) * 100)).toString();
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
            this.alignment = this.selectedSlabHeater.group.alignment;
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