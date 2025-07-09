var jsonInput = document.getElementById("jsonInput");

function uploadProject() {
  jsonInput.click();
}

function loadProject(text = undefined) {
  const projectState = text ? JSON.parse(text) : loadProjectState();
  if (!projectState) {
    return;
  }

  blueprintContext.clearBlueprints();
  (projectState.blueprints.data || []).forEach((bp) => blueprintContext.createBlueprint(loadImage(bp)));

  const topLeftCoordinates = projectState.blueprints.topLeft;
  for (let i = 0; i < topLeftCoordinates.length; i++) {
    elementStore.blueprints[i].topLeftPosition = topLeftCoordinates[i];
  }

  scaleContext.pixelsPerMetersRatio = projectState.scale.pixelsPerMeterRatio;
  gridContext.refreshGridResolution();

  if (scaleContext.pixelsPerMetersRatio) {
    setTimeout(() => tooltip.scalingFinished(), 3_000);
  }

  const rooms = projectState.rooms.rooms;
  rooms.forEach((room) => (room.constructor = { name: CLASS_ROOM }));
  rooms.forEach((room) => elementStore.register(room));
  if (elementStore.rooms.length) {
    setTimeout(() => tooltip.roomAddingFinished(), 3_000);
  }

  const floorHeaters = projectState.floorHeaters.floorHeaters || [];
  floorHeaters.forEach((floorHeaters) => (floorHeaters.constructor = { name: CLASS_FLOOR_HEATER }));
  floorHeaters.forEach((floorHeaters) => elementStore.register(floorHeaters));
  if (elementStore.floorHeaters.length) {
    setTimeout(() => tooltip.panelAdded(), 3_000);
  }

  screenContext.sumDrag = projectState.screen.sumDrag;
  screenContext.zoom = projectState.screen.zoom;

  gridContext.setSeed(projectState.grid.seed);
}

function loadProjectState() {
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
