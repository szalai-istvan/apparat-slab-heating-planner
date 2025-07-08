class MenuRenderer {

    static draw(menuLine) {
        if (menuLine.shouldBeRendered()) {
            menuLine.baseButton.show();
        } else {
            menuLine.baseButton.hide();
        }
        // TODO hide if outside of boundary
        // TODO display with condition
    }
}