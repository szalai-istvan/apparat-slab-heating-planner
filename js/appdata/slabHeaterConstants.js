// SlabHeater constants
const TUBE_DISTANCE_IN_METER = 0.1;
const SLAB_HEATER_LINE_WEIGHT_IN_METER = 0.02;
const SLAB_HEATER_TEXT_SIZE_IN_METER = 0.15;
const SLAB_HEATER_TYPE_RECT_PADDING_IN_METER = 0.1;
const SLAB_HEATER_TEXT_POP_FACTOR = 0.05;
const SLAB_HEATER_CORRECTION_OFFSET = 10;
const SLAB_HEATER_TYPES = {
    width: ['0.8', '1'],
    length: {
        m: ['1', '2', '3', '4', '5'],
        cm: ['0', '20', '40', '60', '80']
    }
};

const SLAB_HEATER_COLORS = ['black', 'darkgrey', 'blue', 'red', 'green', 'orange', 'pink', 'teal', 'darkred'];
let SLAB_HEATER_COLORS_AVAILABLE = [...SLAB_HEATER_COLORS];