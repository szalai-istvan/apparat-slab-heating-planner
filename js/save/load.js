var jsonInput = document.getElementById("jsonInput");

function loadProjectState() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY));
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
    blueprintContext.blueprints[i].topLeftPosition = topLeftCoordinates[i];
  }

  scaleContext.pixelsPerMetersRatio = projectState.scale.pixelsPerMeterRatio;
  gridContext.refreshGridResolution();

  if (scaleContext.pixelsPerMetersRatio) {
    setTimeout(() => tooltip.scalingFinished(), 3_000);
  }

  const rooms = projectState.rooms.rooms;
  roomContext.rooms = rooms;
  rooms.forEach((room) => (room.constructor = { name: "Room" }));
  rooms.forEach((room) => elementStore.register(room));
  if (roomContext.rooms.length) {
    setTimeout(() => tooltip.roomAddingFinished(), 3_000);
  }

  let floorHeaters = setupAndGetFloorHeaters(projectState);

  floorHeaterContext.floorHeaters = floorHeaters;
  panels.forEach((panel) => (panel.constructor = { name: "Panel" }));
  panels.forEach((panel) => elementStore.register(panel));
  if (panelContext.panels.length) {
    setTimeout(() => tooltip.panelAdded(), 3_000);
  }

  screenContext.sumDrag = projectState.screen.sumDrag;
  screenContext.zoom = projectState.screen.zoom;

  gridContext.setSeed(projectState.grid.seed);
}

function setupAndGetPanels(projectState) {
  const panels = [];
  const rooms = projectState.rooms.rooms;
  return panels;
}

function uploadProject() {
  jsonInput.click();
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
