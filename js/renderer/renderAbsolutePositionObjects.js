/**
 * Felrajzolja a kijelzőre az abszolút pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderAbsolutePositionObjects() {
    drawUiBackground();
    drawTooltips();
    elementStore.menus.forEach(menu => drawMenuLine(menu));
    elementStore.optionsBars.forEach(opt => drawOptionsBar(opt));

    drawCursorDebugInfo();
}