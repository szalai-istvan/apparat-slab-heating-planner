/**
 * Megállapítja, hogy létezik-e legalább egy konfigurált szoba
 * 
 * @returns {boolean} true, ha létezik legalább egy konfigurált szoba, egyébként false.
 */
function configuredRoomsExist() { // formerly roomContext.thereAreRooms()
    return elementStore.rooms.length > 0 && roomIsConfigured(elementStore.rooms[0]);
}