function createButtons() {
    const topRibbonButtonSizes = [];

    fileUploadButton = new ButtonWrapper({
        text: 'Alaprajz feltöltése',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => upload(),
        shouldBeRendered: () => true
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => scaleContext.startScaling(),
        shouldBeRendered: () => blueprintContext.blueprintDataIsPresent()
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    addRoomsButton = new ButtonWrapper({
        text: 'Helyiség felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => showAddRoomDialog(),
        shouldBeRendered: () => scaleContext.ratioIsSet()
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    addTopRibbonDelimeter(topRibbonButtonPosition(topRibbonButtonSizes).x);
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    const leftRibbonButtonSizes = [];

    new MenuLine({
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        size: TALL_SMALL_BUTTON_SIZE,
        optionSize: TALL_SMALL_BUTTON_SIZE,
        text: 'Projekt',
        buttons: [ 'Új projekt', 'Projekt mentése', 'Projekt betöltése'],
        buttonsClickFunctions: [() => clearBlueprints(), () => downloadProjectState(), () => uploadProject()],
        selectionMenuMode: false,
        shouldBeRendered: () => true
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);
    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    floorHeaterWidthMenu = new MenuLine({
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        size: TALL_SMALL_BUTTON_SIZE,
        optionSize: SMALL_BUTTON_SIZE,
        text: 'Szélesség',
        buttons: FLOOR_HEATER_TYPES.width,
        labelerFunc: a => (a + ' m').replace('.', ','),
        shouldBeRendered: () => roomContext.thereAreRooms()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    floorHeaterLengthMenu = new MenuLine({
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        size: TALL_SMALL_BUTTON_SIZE,
        optionSize: SMALL_BUTTON_SIZE,
        text: 'Hosszúság',
        buttons: FLOOR_HEATER_TYPES.length,
        labelerFunc: a => (a + ' m').replace('.', ','),
        shouldBeRendered: () => roomContext.thereAreRooms()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    addFloorHeaterButton = new ButtonWrapper({
        text: 'Hozzáadás',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => floorHeaterContext.createFloorHeater(),
        shouldBeRendered: () => roomContext.thereAreRooms()
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);
    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);
    // TODO panel forgatás, flip, duplikáció, csőtörlés

    deleteRoomButton = new ButtonWrapper({
        text: 'Helyiség törlése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => roomContext.displayDeleteButton()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    const downloadButtonPos = sidePanelButtonPosition(leftRibbonButtonSizes);
    downloadButtonPos.y += SMALL_BUTTON_SIZE.y + BUTTON_GAP_Y;
    downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: downloadButtonPos,
        onClick: () => openTransportDialog(),
        shouldBeRendered: () => true
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    helpButton = new ButtonWrapper({
        text: 'Segítség',
        size: SMALL_BUTTON_SIZE,
        position: bottomPosition(SMALL_BUTTON_SIZE),
        onClick: () => displayHelpData(),
        shouldBeRendered: () => true
    });
}