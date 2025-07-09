class SampleContext {
    create() {
        // Create new object and push it into element store
    }

    select(obj = undefined) {
        // Select the specified object, or if obj === undefined then checkForSelection()
    }

    tryToDeselect() {
        // try deselecting and return true if successful
    }

    removeSelected() {
        // remove selected object from element store
    }

    checkForSelection() {
        // if there is a cached selection, return it
        // check for a selectable object, if there is a result save it into selection cache
    }

    clearSelectionCache() {
        // cached selection evict
    }

    clear() {
        // remove all from element store, and initiate next clearing step, if any
    }
}