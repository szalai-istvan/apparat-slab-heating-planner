class MenuRenderer {

    static draw(menuLine) {
        if (menuLine.shouldBeRendered()) {
            menuLine.baseButton.show();
        } else {
            menuLine.baseButton.hide();
            menuLine.menuItems.forEach(b => b.hide());
        }
        // TODO hide if outside of boundary
    }
}