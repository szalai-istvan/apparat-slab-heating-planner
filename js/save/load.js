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

    const slabHeaterGroups = projectState.slabHeaterGroups.slabHeaterGroups || [];
    restoreGroupReferences(slabHeaterGroups);

    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.constructor = {name: CLASS_SLAB_HEATER_GROUP};
        elementStore.register(slabHeaterGroup);

        const slabHeaters = slabHeaterGroup.slabHeaters;
        slabHeaters.forEach((slabHeater) => (slabHeater.constructor = { name: CLASS_SLAB_HEATER }));
        slabHeaters.forEach((slabHeater) => elementStore.register(slabHeater));
    }

    screenSumDrag = projectState.screen.sumDrag;
    screenZoom = projectState.screen.zoom;

    setGridSeed(projectState.grid.seed);
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
