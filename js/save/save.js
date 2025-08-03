function downloadProjectState() {
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
}

function saveProjectToLocalStorage() {
    console.log('>>> Saving project to local storage');
    const stateStr = getProjectState();
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
    console.log('<<< Saving project to local storage');
}

function getProjectState() {
    const rooms = elementStore.rooms.filter(room => roomIsConfigured(room));
    const slabHeaterGroups = elementStore.slabHeaterGroups.filter(shg => !shg.isSelected);
    const boxGroups = elementStore.boxGroups.filter(bg => !bg.isSelected);

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
                slabHeaterGroups: slabHeaterGroups.map(removeCyclicReferencesOfSlabHeaterGroup)
            },
            boxGroups: {
                boxGroups: boxGroups.map(removeCyclicReferencesOfBoxGroup)
            }
        };
    } finally {
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
    return slabHeaterGroup;
}

function restoreGroupReferencesOfSlabHeaterGroups(slabHeaterGroups) {
    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.slabHeaters.forEach(sh => sh.group = slabHeaterGroup);
    }
}

function removeCyclicReferencesOfBoxGroup(boxGroup) {
    boxGroup.boxes.forEach(b => b.group = null);
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