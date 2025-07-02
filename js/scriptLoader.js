const scripts = [
    'renderers/UiRenderer.js',
    'constants/components.js',
    'constants/constants.js',
    'helper/documentDimensionsHelper.js',
    'p5/draw.js',
    'p5/setup.js'
];

(function loadScripts() {
    let body = document.getElementsByTagName('body')[0];
    for (let s of scripts) {
        let script = document.createElement('script');
        script.setAttribute('src', 'js/' + s);
        body.appendChild(script);
    }
})()