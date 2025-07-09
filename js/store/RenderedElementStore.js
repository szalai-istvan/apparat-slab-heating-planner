class RenderedElementStore {
    renderedElements = {};

    constructor() {}

    register(obj) {
        const className = getClassName(obj);
        const renderedElement = this.renderedElements[className];

        if (!renderedElement) {
            this.renderedElements[className] = obj;
        } else if (getClassName(renderedElement) === 'Array') {
            renderedthis.renderedElements[className].push(obj);
        } else {
            this.renderedElements[className] = [this.renderedElements[className], obj];
        }
    }
}

const renderedElementStore = new RenderedElementStore();