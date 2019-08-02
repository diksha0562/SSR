const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

    const config = {
    // target: 'node',
        //intended for use on browser
    
    //tell webpack the root file of our server app
    entry: './src/client/client.js',

    //tell webpack where to put output file that is generated
    // needs to be publically available to anyone who ask for this js file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: 'source-map'

};
module.exports = merge(baseConfig, config);