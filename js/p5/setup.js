function setup() {
    angleMode(DEGREES);

    // disableContextMenu();
    // disableEscapeButton();
    // handleWindowResize();
    // enableEnterForConfirm();
    // handleDeleteButton();
    // createRoomPrefillRadioButtons();

    createAndSetupCanvas();
    loadAssets();

    // createButtons();
    
    // tooltip.applicationStarted();

    if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
        loadProject();        
    }
}

function createAndSetupCanvas() {
    docSize = getDocumentDimensions();
    canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent("body");
//    screenContext.setCanvas(canvas);

}

function loadAssets() {
    apparatLogo = loadImage('img/APPARAT_transparent.PNG');
}