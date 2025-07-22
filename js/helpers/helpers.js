const minimumFunction = (a, b) => (a < b ? a : b);
const maximumFunction = (a, b) => (a > b ? a : b);
const sumFunction = (a, b) => a + b;

function calculateDistance(p1, p2) {
    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function pointIsInside(point, middlePoint, areaWidth, areaHeight) {
    const x = point.x;
    const y = point.y;
    let minX, maxX, minY, maxY;

    minX = middlePoint.x - areaWidth / 2;
    maxX = middlePoint.x + areaWidth / 2;

    minY = middlePoint.y - areaHeight / 2;
    maxY = middlePoint.y + areaHeight / 2;

    return x > minX && x < maxX && y > minY && y < maxY;
}

function getClassName(obj) {
    if (!obj || typeof obj !== "object") {
        return null;
    }

    return obj.constructor.name;
}

function formatNumber(num) {
    if (!num) return num;
    if (typeof num !== "number") return num;
    return NUMBER_FORMAT_OBJECT.format(num).replaceAll(",", " ");
}

function roundNumber(number, decimals) {
    const x = 10 ** decimals;
    return Math.round(number * x) / x;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}