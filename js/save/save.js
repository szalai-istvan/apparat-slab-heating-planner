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
    const stateStr = getProjectState();
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
}

function getProjectState() {
    const rooms = elementStore.rooms.filter(room => roomIsConfigured(room));
    const slabHeaterGroups = elementStore.slabHeaterGroups.filter(shg => !shg.isSelected);

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
                slabHeaterGroups: slabHeaterGroups.map(removeCyclicReferences)
            }
        };
    } finally {
        stateStr = JSON.stringify(projectState);
        restoreGroupReferences(slabHeaterGroups);
    }

    return stateStr;
}

function getProjectStateSize() {
    return roundNumber(getProjectState().length / 1024 / 1024, 2) + " MB";
}

function removeCyclicReferences(slabHeaterGroup) {
    slabHeaterGroup.slabHeaters.forEach(sh => sh.group = null);
    return slabHeaterGroup;
}

function restoreGroupReferences(slabHeaterGroups) {
    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.slabHeaters.forEach(sh => sh.group = slabHeaterGroup);
    }
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
    setInterval(saveProjectToLocalStorage, 10_000);
}