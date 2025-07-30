let scalingFirstPoint = null;
let scalingSecondPoint = null;

/**
 * A kurzor pillanatnyi abszolút pozícióját hozzáadja a scaler-hez
 * 
 * @returns {undefined}
 */
function addScalingReferencePoint() { // formerly: scaleContext.addReferencePoint()
    const point = screenContext.getMousePositionAbsolute();
    if (!scalingFirstPoint) {
        scalingFirstPoint = point;
    } else if (!scalingSecondPoint) {
        scalingSecondPoint = point;
        showScalingDialog();
    }
}