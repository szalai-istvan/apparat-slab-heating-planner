/**
 * Visszaadja a létrehozott szobák neveit tartalmazó array-t.
 * 
 * @returns {Array} A szobák neveinek listája.
 */
function getRoomNames() {
    return elementStore.rooms.map(r => r.name);
}