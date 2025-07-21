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

  let projectState = {
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
      slabHeaters: slabHeaters
    }
  };

  return JSON.stringify(projectState);
}

function getProjectStateSize() {
  return roundNumber(getProjectState().length / 1024 / 1024, 2) + " MB";
}

function saveProject() {
  const stateStr = getProjectState();
  localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
  setInterval(saveProject, 10_000);
}