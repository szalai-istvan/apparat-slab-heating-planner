let cachedBoxGroupAlignment = 1;

/**
 * Létrehoz és kiválaszt egy új doboz csoportot
 * 
 */
function createBoxGroup() {
    const box = new Box();
    const group = new BoxGroup({ box, alignment: cachedBoxGroupAlignment });
    selectObject(group);
    group.isSelectedForDrag = true;
}