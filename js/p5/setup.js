var docSize;
var canvas;

function setup() {
    disableContextMenu();
    disableEscapeButton();
    handleWindowResize();
    enableEnterForConfirm();
    handleDeleteButton();
    createRoomPrefillRadioButtons();
    
    docSize = getDocumentDimensions();
    canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent("body");

    screenCanvas = canvas;
    apparatLogo = loadImage('img/APPARAT_transparent.PNG');
    
    angleMode(DEGREES);
    createButtons();
    
    if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
        loadProject();        
    }
}

function getDocumentDimensions() {
    return {
        vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}