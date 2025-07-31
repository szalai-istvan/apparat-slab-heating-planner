class SlabHeaterContext {
    cachedSelection = null;
    selectedSlabHeater = null;

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
            this.remove(slabHeater);
            this.selectedSlabHeater = undefined;
        }
    }

    remove(slabHeater) {
        if (slabHeater) {
            elementStore.remove(slabHeater);
        }
    }

    removeEntirySelectedGroup() {
        const slabHeater = this.selectedSlabHeater;
        if (slabHeater) {
            const group = slabHeater.group;
            elementStore.remove(group);
            group.slabHeaters.forEach(sh => elementStore.remove(sh));
        }
        this.selectedSlabHeater = undefined;
    }
}