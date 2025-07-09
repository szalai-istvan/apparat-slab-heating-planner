class ElementStore {
  blueprints = [];
  rooms = [];
  floorHeaters = [];

  buttons = [];
  menus = [];

  scaleContext = null;
  tooltip = null;

  constructor() {}

  register(obj) {
    const className = getClassName(obj);
    if (!className) {
      return;
    }

    if (className === CLASS_FLOOR_HEATER) {
      this.floorHeaters.push(obj);
    } else if (className === CLASS_BLUEPRINT) {
      this.blueprints.push(obj);
    } else if (className === CLASS_ROOM) {
      this.rooms.push(obj);
    } else if (className === CLASS_SCALE_CONTEXT) {
      this.scaleContext = obj;
    } else if (className === CLASS_BUTTON_WRAPPER) {
      this.buttons.push(obj);
    } else if (className === CLASS_TOOLTIP) {
      this.tooltip = obj;
    } else if (className === CLASS_MENU_LINE) {
      this.menus.push(obj);
    } else {
      throw new Error(`Attempt to register unexpected render type: ${className}`);
    }
  }

  remove(obj) {
    const className = getClassName(obj);
    if (!className) {
      return;
    }

    if (className === CLASS_ROOM) {
      this.rooms = this.rooms.filter((x) => x !== obj);
    } else if (className === CLASS_BLUEPRINT) {
      this.blueprints = this.blueprints.filter((x) => x !== obj);
    } else if (className === CLASS_FLOOR_HEATER) {
      // TODO class nevek kicserélése konstansokra
      this.floorHeaters = this.floorHeaters.filter((x) => x !== obj);
    } else {
      throw new Error(
        `Deleting render object of type ${className} is unspecified.`
      );
    }
  }
}

const elementStore = new ElementStore();
