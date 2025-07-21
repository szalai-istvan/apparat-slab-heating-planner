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

    leftRibbonButtonSizes.push({x: 0, y: UI_TEXT_SIZE/2});
    addSidePanelText('Födémfűtés elemek', sidePanelButtonPosition(leftRibbonButtonSizes).y);
    leftRibbonButtonSizes.push({x: 0, y: UI_TEXT_SIZE/2});

    slabHeaterWidthMenu = new MenuLine({
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        size: TALL_SMALL_BUTTON_SIZE,
        optionSize: SMALL_BUTTON_SIZE,
        text: 'Szélesség',
        buttons: SLAB_HEATER_TYPES.width,
        labelerFunc: a => (a + ' m').replace('.', ','),
        shouldBeRendered: () => roomContext.thereAreRooms()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    slabHeaterLengthMenu = new MenuLine({
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        size: TALL_SMALL_BUTTON_SIZE,
        optionSize: SMALL_BUTTON_SIZE,
        text: 'Hosszúság',
        buttons: SLAB_HEATER_TYPES.length,
        labelerFunc: a => (a + ' m').replace('.', ','),
        shouldBeRendered: () => roomContext.thereAreRooms()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    addSlabHeaterButton = new ButtonWrapper({
        text: 'Hozzáadás',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => slabHeaterContext.createSlabHeater(),
        shouldBeRendered: () => roomContext.thereAreRooms()
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);
    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    leftRibbonButtonSizes.push({x: 0, y: UI_TEXT_SIZE/2});
    addSidePanelText('Födémáttörések', sidePanelButtonPosition(leftRibbonButtonSizes).y);
    leftRibbonButtonSizes.push({x: 0, y: UI_TEXT_SIZE/2});

    addSlabHeaterButton = new ButtonWrapper({
        text: 'Hozzáadás',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => {},
        shouldBeRendered: () => roomContext.thereAreRooms()
    });

    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);
    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    deleteButton = new ButtonWrapper({
        text: 'Törlés',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => selectionContext.selectedObject
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);

    const rotatePosition = sidePanelButtonPosition(leftRibbonButtonSizes);
    rotateLeftButton = new ButtonWrapper({
        text: '↶',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: rotatePosition,
        onClick: () => SlabHeaterManager.rotateSelected(-1),
        shouldBeRendered: () => slabHeaterContext.selectedSlabHeater
    });
    
    rotatePosition.x += HALF_WIDTH_BUTTON_SIZE.x;
    rotateRightButton = new ButtonWrapper({
        text: '↷',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: rotatePosition,
        onClick: () => SlabHeaterManager.rotateSelected(1),
        shouldBeRendered: () => slabHeaterContext.selectedSlabHeater
    });
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);

    flipButton = new ButtonWrapper({
        text: 'Tükrözés',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => SlabHeaterManager.flipSelected(),
        shouldBeRendered: () => slabHeaterContext.selectedSlabHeater
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);

    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);
    const downloadButtonPos = sidePanelButtonPosition(leftRibbonButtonSizes);
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