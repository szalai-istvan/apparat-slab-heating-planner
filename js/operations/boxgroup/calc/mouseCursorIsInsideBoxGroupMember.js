/**
 * Megállapítja, hogy a kurzor a paraméterül kapott doboz csoport valamely tagjában található-e
 * 
 * @param {BoxGroup} boxGroup 
 * @returns {boolean}
 */
function mouseCursorIsInsideBoxGroupMember(boxGroup) {
    if (boxGroup.cursorIsInsideCache === null) {
        const selectable = boxGroup.boxes.filter(b => mouseCursorIsInsideBox(b));
        boxGroup.cursorIsInsideCache = selectable.length > 0;
    }

    return boxGroup.cursorIsInsideCache;
}
