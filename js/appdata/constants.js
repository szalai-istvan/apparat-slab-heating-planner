// UI constants
const BACKGROUND_COLOR = 255;
const REGULAR_BUTTON_SIZE = { x: 100, y: 40 };
const SMALL_BUTTON_SIZE = { x: 80, y: 30 };
const HALF_WIDTH_BUTTON_SIZE = { x: 40, y: 30 };
const TALL_SMALL_BUTTON_SIZE = { x: 80, y: 45 };
const BUTTON_GAP_X = 10;
const BUTTON_GAP_Y = 5;
const DELIMITER_POSITIONS = [];
const TOP_RIBBON_HEIGHT = 60;
const LEFT_RIBBON_WIDTH = 100;
const UI_COLOR = 'lightgrey';

// Room constants
const ROOM_TEXT_SIZE_IN_METERS = 0.25;
const ROOM_TEXT_POP_FACTOR = 1.1;
const ROOM_LINE_WEIGHT_IN_METERS = 0.017;
const ROOM_DEFAULT_TEXT_COLOR = "green";
const PREFILL_ROOM_NAMES = [
  "Szoba 1",
  "Nappali",
  "Szoba 2",
  "Hálószoba 1",
  "Szoba 3",
  "Hálószoba 2",
  "Folyosó",
  "Gyerekszoba 1",
  "Dolgozószoba",
  "Gyerekszoba 2",
  "Gardrób",

  "Konyha",
  "Fürdőszoba",
  "Előszoba"
];

// Text constants
const DEFAULT_TEXT_COLOR = "black";
const SELECTED_TEXT_COLOR = "red";

// File constants
const IMAGE_CONTENT_TYPES = ["image/jpeg", "image/png"];
const PDF_CONTENT_TYPE = "application/pdf";

// Debug setting, auto-saving to local storage
const SAVE_TO_LOCAL_STORAGE_ENABLED = false;
const LOCAL_STORAGE_DATA_KEY = 'rajzolator-project-save';

// grid settings
const GRID_RESOLUTION_METER = 0.05;

// helper constants
const NUMBER_FORMAT_OBJECT = new Intl.NumberFormat("en-US");

// FloorHeater constants
const RED = 'red';
const BLUE = 'blue';