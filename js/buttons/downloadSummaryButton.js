var downloadSummaryButton;

const transportDialog = document.getElementById('transportDialog');
const transportInput = document.getElementById('transportInput');
const transportDialogOkButton = document.getElementById('transportDialogOkButton');
const transportDialogCloseButton = document.getElementById('transportDialogCloseButton');

function openTransportDialog() {
    transportInput.value = '';
    transportDialog.showModal();
    screenContext.toggleControls();
}

transportDialogOkButton.addEventListener('click', () => {
    const km = Number(transportInput.value.replace(",", "."));
    if (km < 0) {
        displayMessage('Negatív távolság megadása nem lehetséges.');
        return;
    } else if (isNaN(km)) {
        displayMessage('Érvénytelen távolság!');
        return;
    }

    transportDialog.close();
    screenContext.toggleControls();
    startExcelExport(km);
});

transportDialogCloseButton.addEventListener('click', () => {
    transportDialog.close();
    screenContext.toggleControls();
});