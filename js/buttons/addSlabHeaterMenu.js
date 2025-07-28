var slabHeaterLengthOptionsBar;
var slabHeaterWidthOptionsBar;

var addSlabHeaterButton;

function resolveSlabHeaterLengthOptionBarValue(optionsBar) {
    const s0 = optionsBar.selected[0];
    const s1 = optionsBar.selected[1];
    if (s0 && s1) {
        return Number(s0) + 0.01 * Number(s1);
    }
    return undefined;
}