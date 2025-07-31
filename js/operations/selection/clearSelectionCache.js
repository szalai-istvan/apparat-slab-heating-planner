/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét
 * 
 * @returns {undefined}
 */
function clearSelectionCache() {
    cachedSelectedRoom = null;
    cachedSelectedSlabHeaterGroup = null;
}