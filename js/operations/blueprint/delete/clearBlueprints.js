/**
 * Törli a rajzlapon található összes tervrajzot és törli a rögzített méretarányokat.
 * 
 * @returns {undefined}
 */
function clearBlueprints() {
    elementStore.blueprints = [];
    scaleContext.clear();
}