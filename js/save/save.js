let saveInProgress = false;

function downloadProjectState() {
    try {
        saveInProgress = true;
        const text = getProjectState();
        var element = document.createElement('a');

        element.setAttribute(
            'href',
            "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute(
            "download",
            `APPARAT_project_${Math.random().toString().substring(2)}.json`
        );

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

    } finally {
        saveInProgress = false;
    }
}

function saveProjectToLocalStorage() {
    try {
        saveInProgress = true;
        console.log('>>> Saving project to local storage');
        const stateStr = getProjectState();
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
    } finally {
        console.log('<<< Saving project to local storage');
        saveInProgress = false;
    }
}

function getProjectState() {
    const rooms = elementStore.rooms.filter(room => roomIsConfigured(room));
    const slabHeaterGroups = elementStore.slabHeaterGroups;
    const boxGroups = elementStore.boxGroups;

    let stateStr;
    let projectState = {};
    try {
        projectState = {
            blueprints: {
                data: elementStore.blueprints.map((bp) => bp.data.canvas.toDataURL("image/png")),
                topLeft: elementStore.blueprints.map((bp) => bp.topLeftPosition),
            },
            scale: {
                pixelsPerMeterRatio: pixelsPerMetersRatio,
            },
            rooms: {
                rooms: rooms,
            },
            screen: {
                sumDrag: screenSumDrag,
                zoom: screenZoom,
            },
            grid: {
                seed: gridSeed,
            },
            slabHeaterGroups: {
                slabHeaterGroups: slabHeaterGroups.map(shg => removeCyclicReferencesOfSlabHeaterGroup(shg))
            },
            boxGroups: {
                boxGroups: boxGroups.map(removeCyclicReferencesOfBoxGroup)
            }
        };
    } finally {
        console.log(projectState);
        stateStr = JSON.stringify(projectState);
        restoreGroupReferencesOfSlabHeaterGroups(slabHeaterGroups);
        restoreGroupReferencesOfBoxGroups(boxGroups);
    }

    return stateStr;
}

function getProjectStateSize() {
    return roundNumber(getProjectState().length / 1024 / 1024, 2) + " MB";
}

function removeCyclicReferencesOfSlabHeaterGroup(slabHeaterGroup) {
    slabHeaterGroup.slabHeaters.forEach(sh => sh.group = null);
    slabHeaterGroup.pipeDriver.slabHeaterGroup = null;
    return slabHeaterGroup;
}

function restoreGroupReferencesOfSlabHeaterGroups(slabHeaterGroups) {
    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.slabHeaters.forEach(sh => sh.group = slabHeaterGroup);
        slabHeaterGroup.pipeDriver.slabHeaterGroup = slabHeaterGroup;
        recalculatePipeDriverConfiguration(slabHeaterGroup.pipeDriver);
    }
}

function removeCyclicReferencesOfBoxGroup(boxGroup) {
    boxGroup.boxes.forEach(b => b.group = null);
    boxGroup.pipeDriver = null;
    return boxGroup;
}

function restoreGroupReferencesOfBoxGroups(boxGroups) {
    for (let boxGroup of boxGroups) {
        boxGroup.boxes.forEach(b => b.group = boxGroup);
    }
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
    setInterval(saveProjectToLocalStorage, 10_000);
}