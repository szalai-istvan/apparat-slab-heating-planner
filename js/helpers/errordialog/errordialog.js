const messageDialog = document.getElementById("messageDialog");
const messageParagraph = document.getElementById("messageParagraph");
const messageOkButton = document.getElementById("messageOkButton");

function displayMessage(text) {
    messageParagraph.innerHTML = text;
    messageDialog.showModal();
    screenContext.toggleControls();
}

messageOkButton.addEventListener(CLICK, () => {
    messageDialog.close();
    screenContext.toggleControls();
});

function displayHelpData() {
    displayMessage("Segítség kérése:<br/>e-mail: sjb@apparat.hu");
}
