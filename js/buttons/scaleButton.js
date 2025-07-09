var scaleButton;

const scalingDialog = document.getElementById('scalingDialog');
const scalingInput = document.getElementById('scalingInput');
const scalingDialogCloseButton = document.getElementById('scalingDialogCloseButton');

const scalingDialogConfirm = document.getElementById('scalingDialogConfirm');
const scalingDialogConfirmButton = document.getElementById('scalingDialogConfirmButton');
const scalingDialogCancelButton = document.getElementById('scalingDialogCancelButton');

function showScalingDialog() {
    scalingInput.value = '';
    scalingDialog.showModal();
    screenContext.toggleControls();
    setTimeout(() => scalingInput.focus(), 200);
}

scalingDialogCloseButton.addEventListener(CLICK, (event) => {
    const scalingValue = scalingInput.value.replace(",", ".");
    scaleContext.processScalingValue(scalingValue);
});

scalingDialogConfirmButton.addEventListener(CLICK, () => {
    scalingDialogConfirm.close();
    screenContext.toggleControls();
    scaleContext.clear();
    scaleContext.startScaling();
});

scalingDialogCancelButton.addEventListener(CLICK, () => {
    scalingDialogConfirm.close();
    screenContext.toggleControls();
});