/**
 * Kiszámolja a paraméterül kapott födém fűtő csoporthoz rendelhető csővezető kezdőpontját
 * 
 * @param {SlabHeaterGroup} SlabHeaterGroup a csoport paraméter
 */
function calculatePipeDriverFirstPoint(slabHeaterGroup) {
    const ratio = pixelsPerMetersRatio;
    const slabHeaters = slabHeaterGroup.slabHeaters;
    const firstSlabHeater = slabHeaters[0];
    const firstCenterPoint = firstSlabHeater.centerPosition;

    if (!firstSlabHeater) {
        return undefined;
    }

    if (!firstCenterPoint) {
        return undefined;
    }

    const width = slabHeaterGroup.width * ratio;
    const length = slabHeaterGroup.length * ratio;
    const additionalOffset = PIPE_DRIVER_ADDITIONAL_OFFSET_METERS * ratio;
    const widthOffset = (slabHeaters.length - 1) * width / 2;
    const lengthOffset = length / 2 + additionalOffset;

    if (slabHeaterGroup.alignment % 2 === 0) {
        return createPoint(firstCenterPoint.x + lengthOffset, firstCenterPoint.y + widthOffset);
    } else {
        return createPoint(firstCenterPoint.x + widthOffset, firstCenterPoint.y + lengthOffset);
    }
}