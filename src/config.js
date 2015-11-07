System.config({
    transpiler: 'babel',
    baseURL: '.',
    defaultJSExtensions: true,
    babelOptions: {
        stage: 0
    },
    map: {
        matreshka: 'src/lib/matreshka',
        text: 'src/lib/text',
        lib: 'src/lib',
        app: 'src/app',
        codemirror: 'node_modules/codemirror/lib/codemirror',
        'javascript-syntax': 'node_modules/codemirror/mode/javascript/javascript',
        jsonlint: 'node_modules/jsonlint/web/jsonlint',
        'js-beautify': 'node_modules/js-beautify/js/lib/beautify'
    }
});
