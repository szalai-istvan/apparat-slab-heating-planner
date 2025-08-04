/**
 * Felrajzolja a kijelzőre az abszolút pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderAbsolutePositionObjects() {
    drawUiBackground();
    drawTooltips();
    elementStore.buttons.forEach(button => drawButtonWrapper(button));
    elementStore.menus.forEach(menu => drawMenuLine(menu));
    elementStore.optionsBars.forEach(opt => drawOptionsBar(opt));

    drawCursorDebugInfo();
}