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

function getProjectState() {
    const rooms = elementStore.rooms.filter((room) => RoomManager.roomIsConfigured(room));
    const slabHeaters = elementStore.slabHeaters.filter(fh => !fh.isSelectedForDrag);

    let stateStr;
    let projectState = {};
    try {
        projectState = {
            blueprints: {
                data: elementStore.blueprints.map((bp) => bp.data.canvas.toDataURL("image/png")),
                topLeft: elementStore.blueprints.map((bp) => bp.topLeftPosition),
            },
            scale: {
                pixelsPerMeterRatio: scaleContext.pixelsPerMetersRatio,
            },
            rooms: {
                rooms: rooms,
            },
            screen: {
                sumDrag: screenContext.sumDrag,
                zoom: screenContext.zoom,
            },
            grid: {
                seed: gridContext.seed,
            },
            slabHeaters: {
                slabHeaters: slabHeaters.map(destructureSlabHeaterGroup)
            }
        };
    } finally {
        stateStr = JSON.stringify(projectState);
        reconstructSlabHeaterGroup(slabHeaters);
    }

    return stateStr;
}

function getProjectStateSize() {
    return roundNumber(getProjectState().length / 1024 / 1024, 2) + " MB";
}

function saveProject() {
    const stateStr = getProjectState();
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
}

function destructureSlabHeaterGroup(slabHeater) {
    const group = slabHeater.group;
    slabHeater.group = group.slabHeaters.map(sh => sh.id);
    return slabHeater;
}

function reconstructSlabHeaterGroup(slabHeaters) {
    const slabHeaterGroups = {};

    for (let slabHeater of slabHeaters) {
        const group = slabHeater.group;
        if (getClassName(group) !== 'Array') {
            continue;
        }

        const groupId = group.reduce((a, b) => a + b, '');
        if (slabHeaterGroups[groupId]) {
            slabHeater.group = slabHeaterGroups[groupId];
            continue;
        }

        const slabHeaterGroup = new SlabHeaterGroup();
        for (let id of group) {
            const slabHeaterToAdd = slabHeaters.filter(sh => sh.id === id)[0];
            slabHeaterToAdd && slabHeaterGroup.add(slabHeaterToAdd);
        }
        slabHeaterGroups[groupId] = slabHeaterGroup;
        slabHeater.group = slabHeaterGroup;
    }
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
    setInterval(saveProject, 10_000);
}