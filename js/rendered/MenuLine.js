class MenuLine {
    position;
    size;
    baseButton;
    menuItems = [];
    value;
    menuItemsShown = false;
    hideTimeOutId;
    valueSet = {};
    shouldBeRendered;

    constructor({position, size, text, buttons, labelerFunc, shouldBeRendered}) {
        this.position = position;
        this.size = size;
        this.text = text + ' >';
        this.shouldBeRendered = shouldBeRendered;

        this.baseButton = createButton(this.text);
        const baseButton = this.baseButton;
        baseButton.size(size.x, size.y);
        baseButton.position(position.x, position.y);
        baseButton.mouseClicked(() => this.baseButtonClick());

        let i = 0;
        const labeler = labelerFunc ? labelerFunc : a => a;
        for (let button of buttons) {
            const label = labeler(button);
            const menuItem = createButton(label);
            this.valueSet[label] = button;

            menuItem.size(SMALL_BUTTON_SIZE.x, SMALL_BUTTON_SIZE.y);
            menuItem.mouseClicked(() => this.selectMenuItem(label));
            menuItem.position(position.x + size.x, position.y + SMALL_BUTTON_SIZE.y * i++);
            menuItem.style('border-radius', '0');
            menuItem.style('border', '1px solid black');
            menuItem.elt.classList.add('hovered');
            this.menuItems.push(menuItem);
        }

        this.hideMenuItems();
        renderer.register(this);
    }

    selectMenuItem(text) {
        for (let menuItem of this.menuItems) {
            menuItem.style('background', null);
        }
        const selected = this.menuItems.filter(button => button.elt.innerHTML === text)[0];
        selected.style('background', 'darkgrey');
        this.value = this.valueSet[selected.elt.innerHTML];
        setTimeout(() => this.hideMenuItems(), 300);
        this.baseButton.elt.innerHTML = this.text + '<br/>' + '(' + text + ')';
    }

    showMenuItems() {
        renderer.menus.forEach(menu => menu.hideMenuItems());
        this.menuItemsShown = true;
        for (let button of this.menuItems) {
            button.show();
        }
    }

    hideMenuItems() {
        this.menuItemsShown = false;
        for (let button of this.menuItems) {
            button.hide();
        }
    }

    baseButtonClick() {
        if (this.menuItemsShown) {
                this.menuItemsShown = false;
                this.hideMenuItems();
                return;
        }
        if (this.hideTimeOutId) {
            clearTimeout(this.hideTimeOutId);
        }
        this.menuItemsShown = true;
        this.showMenuItems();
        this.hideTimeOutId = setTimeout(() => this.hideMenuItems(), 5_000);
    }
}