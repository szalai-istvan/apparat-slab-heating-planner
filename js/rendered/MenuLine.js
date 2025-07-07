class MenuLine {
    position;
    size;
    baseButton;
    menuItems = [];
    value;
    menuItemsShown = false;
    hideTimeOutId;

    constructor({position, size, text, buttons}) {
        this.position = position;
        this.size = size;
        this.text = text + ' >';

        this.baseButton = createButton(this.text);
        const baseButton = this.baseButton;
        baseButton.size(size.x, size.y);
        baseButton.position(position.x, position.y);
        baseButton.mouseClicked(() => this.baseButtonClick());

        let i = 0;
        for (let button of buttons) {
            const menuItem = createButton(button);
            menuItem.size(SMALL_BUTTON_SIZE.x, SMALL_BUTTON_SIZE.y);
            menuItem.mouseClicked(() => this.selectMenuItem(button));
            menuItem.position(position.x + size.x, position.y + SMALL_BUTTON_SIZE.y * i++);
            menuItem.style('border-radius', '0');
            menuItem.style('border', '1px solid black');
            menuItem.elt.classList.add('hovered');
            this.menuItems.push(menuItem);
        }

        this.hideMenuItems();
        renderer.register(this);
    }

    draw() {
        // TODO hide if outside of boundary
        // TODO display with condition
    }

    selectMenuItem(text) {
        for (let menuItem of this.menuItems) {
            menuItem.style('background', null);
        }
        const selected = this.menuItems.filter(button => button.elt.innerHTML === text)[0];
        selected.style('background', 'darkgrey');
        this.value = selected.elt.innerHTML;
        setTimeout(() => this.hideMenuItems(), 500);
        this.baseButton.elt.innerHTML = this.text + '<br/>' + '(' + this.value + ')';
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