/**
 * Megkíséreli megszüntetni a doboz csoport kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectBoxGroup() {
    const boxGroup = selectedBoxGroup;
    if (!boxGroup) {
        return true;
    }

    // TODO validáció ...

    boxGroup.isSelected = false;
    boxGroup.isSelectedForDrag = false;
    boxGroup.clickedMemberIndex = null;

    selectedBoxGroup = null;
    cachedSelectableBoxGroup = null;
    return true;
}