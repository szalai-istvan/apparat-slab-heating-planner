/**
 * Felrajzol egy tervrajzot a rajzlapra.
 * 
 * @param {Blueprint} blueprint tervrajz adat
 * @returns {undefined}
 */
function drawBlueprint(blueprint) {
    if (getClassName(blueprint) !== CLASS_BLUEPRINT) {
        throw new Error($`Unexpected parameter type: ${getClassName(blueprint)}. Function only accepts ${CLASS_BLUEPRINT}`);
    }

    const data = blueprint.data;
    if (!data) {
        return;
    }

    const topLeftCoordinates = BlueprintManager.getTopLeftCoordinates(blueprint);

    topLeftCoordinates && image(data,
        topLeftCoordinates.x,
        topLeftCoordinates.y,
        data.width,
        data.height
    );
}