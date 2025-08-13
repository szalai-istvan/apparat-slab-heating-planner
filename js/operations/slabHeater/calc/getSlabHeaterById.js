/**
 * Visszaadja a megadott azonosítójú födémfűtőt
 * 
 * @param {string} id Egyedi azonosító
 * @returns {SlabHeater}
 */
function getSlabHeaterById(id) {
    return elementStore.slabHeatersById[id];
}

/**
 * Visszaadja a megadott azonosítójú födémfűtők listáját
 * 
 * @param {Array} idList Egyedi azonosító lista
 * @returns {Array} a megadott azonosítójú födémfűtők listája
 */
function getSlabHeatersByIdList(idList) {
    return idList.map(id => elementStore.slabHeatersById[id]).filter(x => x);
}