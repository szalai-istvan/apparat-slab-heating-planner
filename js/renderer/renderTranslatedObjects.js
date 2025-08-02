/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjects() {
    elementStore.blueprints.forEach(bluePrint => drawBlueprint(bluePrint));
    elementStore.rooms.forEach(room => drawRoom(room));
    drawScaler();
    elementStore.buttons.forEach(button => drawButtonWrapper(button));
    elementStore.slabHeaterGroups.forEach(shg => drawSlabHeaterGroup(shg));

    if (debugEnabled) {
        DebugInfoRenderer.drawAxis();
    }
}