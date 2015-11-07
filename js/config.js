'use strict';

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
        app: 'src/app'
    }
});