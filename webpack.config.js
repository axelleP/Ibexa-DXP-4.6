const Encore = require('@symfony/webpack-encore');
const path = require('path');
const getIbexaConfig = require('./ibexa.webpack.config.js');
const ibexaConfig = getIbexaConfig(Encore);
const customConfigs = require('./ibexa.webpack.custom.configs.js');

Encore.reset();
Encore.setOutputPath('public/build/')
    .setPublicPath('/build')
    .enableStimulusBridge('./assets/controllers.json')
    .enableSassLoader()
    .enableReactPreset()
    .enableSingleRuntimeChunk()
    .copyFiles({
        from: './assets/images',
        to: 'images/[path][name].[ext]',
        pattern: /\.(png|svg)$/,
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    });


Encore.addEntry('app', './assets/app.js');

Encore
    .addStyleEntry('tutorial', [
        path.resolve(__dirname, './assets/css/normalize.css'),
        path.resolve(__dirname, './assets/css/bootstrap.min.css'),
        path.resolve(__dirname, './assets/css/bootstrap-theme.css'),
        path.resolve(__dirname, './assets/css/style.css')
    ])
    .addEntry('tutorial-js', [
        path.resolve(__dirname, './assets/js/bootstrap.min.js')
]);

const projectConfig = Encore.getWebpackConfig();

projectConfig.name = 'app';

module.exports = [ibexaConfig, ...customConfigs, projectConfig];

// uncomment this line if you've commented-out the above lines
// module.exports = [ eZConfig, ibexaConfig, ...customConfigs ];
