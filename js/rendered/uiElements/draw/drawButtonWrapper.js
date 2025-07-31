/**
 * Felrajzolja a képernyője a paraméterül kapott gombot
 * 
 * @param {ButtonWrapper} buttonWrapper gomb.
 * @returns {undefined}
 */
function drawButtonWrapper(buttonWrapper) {
    checkClass(buttonWrapper, CLASS_BUTTON_WRAPPER);

    const button = buttonWrapper.button;
    if (buttonWrapper.shouldBeRendered() && !buttonWrapper.lastResult) {
        button.removeAttribute('disabled');
        buttonWrapper.lastResult = true;
    }

    if (!buttonWrapper.shouldBeRendered() && buttonWrapper.lastResult) {
        button.attribute('disabled', '');
        buttonWrapper.lastResult = false;
    }
}