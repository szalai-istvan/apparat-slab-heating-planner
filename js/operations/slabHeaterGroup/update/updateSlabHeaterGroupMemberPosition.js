/**
 * A paraméterül kapott födémfűtő csoport elemeinek újrakalkulálja a pozícióját
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup csoport
 * @returns {undefined}
 */
function updateSlabHeaterGroupMemberPosition(slabHeaterGroup) {
    const slabHeaters = slabHeaterGroup.slabHeaters;
    const first = slabHeaters[0];
    const firstCenterPosition = slabHeaterGroup.isSelectedForDrag ? calculateSlabHeaterCenterPositionWithCorrection(first, slabHeaterGroup.width, slabHeaterGroup.length) : first.centerPosition;

    for (let index = 0; index < slabHeaters.length; index++) {
        slabHeaters[index].centerPosition = offsetCenterPosition({
            originalCenter: firstCenterPosition,
            width: slabHeaterGroup.width,
            alignment: slabHeaterGroup.alignment,
            index: index
        });
    }
}