const errorDialog = document.getElementById('errorDialog');
const errorMessageParagraph = document.getElementById('errorMessageParagraph');
const errorMessageOkButton = document.getElementById('errorMessageOkButton');

function displayMessage(text) {
    errorMessageParagraph.innerHTML = text;
    errorDialog.showModal();
    screenContext.toggleControls();
}

errorMessageOkButton.addEventListener('click', () => {
    errorDialog.close();
    screenContext.toggleControls();
});