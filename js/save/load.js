var jsonInput = document.getElementById("jsonInput");

function uploadProject() {
    jsonInput.click();
}

function loadProject(text = undefined) {
    const projectState = text ? JSON.parse(text) : loadProjectStateFromLocalStorage();
    if (!projectState) {
        return;
    }

    clearBlueprints();
    (projectState.blueprints.data || []).forEach((bp) => createBlueprint(loadImage(bp)));

    const topLeftCoordinates = projectState.blueprints.topLeft;
    for (let i = 0; i < topLeftCoordinates.length; i++) {
        elementStore.blueprints[i].topLeftPosition = topLeftCoordinates[i];
    }

    pixelsPerMetersRatio = projectState.scale.pixelsPerMeterRatio;
    updateGridResolution();

    const rooms = projectState.rooms.rooms;
    rooms.forEach((room) => (room.constructor = { name: CLASS_ROOM }));
    rooms.forEach((room) => elementStore.register(room));
    SLAB_HEATER_COLORS_AVAILABLE = [...SLAB_HEATER_COLORS];
    rooms.forEach(room => SLAB_HEATER_COLORS_AVAILABLE = SLAB_HEATER_COLORS_AVAILABLE.filter(a => a !== room.slabHeaterColor));


    const slabHeaterGroups = projectState.slabHeaterGroups.slabHeaterGroups || [];
    restoreGroupReferencesOfSlabHeaterGroups(slabHeaterGroups);

    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.constructor = {name: CLASS_SLAB_HEATER_GROUP};
        slabHeaterGroup.pipeDriver.constructor = {name: CLASS_PIPE_DRIVER};
        slabHeaterGroup.pipeDriver.isSelected = false;
        slabHeaterGroup.pipeDriver.isSelectedForDrag = false;
        elementStore.register(slabHeaterGroup);
        elementStore.register(slabHeaterGroup.pipeDriver);

        const slabHeaters = slabHeaterGroup.slabHeaters;
        slabHeaters.forEach((slabHeater) => (slabHeater.constructor = { name: CLASS_SLAB_HEATER }));
        slabHeaters.forEach((slabHeater) => elementStore.register(slabHeater));
    }

    const boxGroups = projectState.boxGroups.boxGroups || [];
    restoreGroupReferencesOfBoxGroups(boxGroups);

    for (let boxGroup of boxGroups) {
        boxGroup.constructor = {name: CLASS_BOX_GROUP};
        elementStore.register(boxGroup);

        const boxes = boxGroup.boxes;
        boxes.forEach(b => b.constructor = {name: CLASS_BOX});
        boxes.forEach(b => elementStore.register(b));
    }

    elementStore.slabHeaterGroups.forEach(shg => recalculatePipeDriverConfiguration(shg.pipeDriver));

    screenSumDrag = projectState.screen.sumDrag;
    screenZoom = projectState.screen.zoom;

    if (projectState.grid.seed) {
        projectState.grid.seed.constructor = {name: CLASS_POINT};
        setGridSeed(projectState.grid.seed);
    }
}

function recalculatePipeDriverConfiguration(pipeDriver) {
    const boxGroup = getBoxGroupWithEndNodeAtPipeDriversLastPoint(pipeDriver);
    if (boxGroup) {
        boxGroup.pipeDriver = pipeDriver;
        pipeDriver.isFullyConfigured = true;
    }
}

function loadProjectStateFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY));
}

function handleJsonSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        const result = event.target.result;
        if (result) {
            loadProject(result);
        }
        imageInput.value = "";
    };
    reader.readAsText(file);
}
jsonInput.addEventListener("change", handleJsonSelect);
