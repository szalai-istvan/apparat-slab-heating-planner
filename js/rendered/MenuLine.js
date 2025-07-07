class MenuLine {
    position;
    size;
    baseButton;
    menuItems = [];
    value;
    showMenuItems = false;
    hideTimeOutId;

    constructor({position, size, text, buttons}) {
        this.position = position;
        this.size = size;

        this.baseButton = createButton(text + ' >');
        const baseButton = this.baseButton;
        baseButton.size(size.x, size.y);
        baseButton.position(position.x, position.y);
        baseButton.mouseClicked(() => {
            if (this.showMenuItems) {
                this.showMenuItems = false;
                return;
            }
            if (this.hideTimeOutId) {
                clearTimeout(this.hideTimeOutId);
            }
            this.showMenuItems = true;
            this.hideTimeOutId = setTimeout(() => this.showMenuItems = false, 5_000);
        });

        let i = 0;
        for (let button of buttons) {
            const menuItem = createButton(button);
            menuItem.size(size.x, size.y);
            menuItem.mouseClicked(() => this.selectMenuItem(button));
            menuItem.position(position.x + size.x, position.y + size.y * i++);
            this.menuItems.push(menuItem);
        }

        renderer.register(this);
    }

    draw() {
        this.baseButton.show();
        if (!this.showMenuItems) {
            this.menuItems.forEach(mu => mu.hide());
            return;
        }
        this.menuItems.forEach(mu => mu.show());
    }

    selectMenuItem(text) {
        console.log(text);
        for (let menuItem of this.menuItems) {
            menuItem.style('background', 'lightgray');
        }
        const selected = this.menuItems.filter(button => button.elt.innerHTML === text)[0];
        selected.style('background', 'green');
        this.value = selected.elt.innerHTML;
        setTimeout(() => this.showMenuItems = false, 500);
    }
}

setTimeout(() => new MenuLine({
    position: {x: 200, y: 200},
    size: {x: 80, y: 30},
    text: 'szélesség',
    buttons: ['1 m', '2 m']
}), 1_000);