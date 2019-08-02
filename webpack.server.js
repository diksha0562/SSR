const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');
//inform webpack that we are building a bundle for nodeJs, rather than for browser
    const config = {
    target: 'node',
    
    //tell webpack the root file of our server app
    entry: './src/index.js',

    //tell webpack where to put output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    externals: [webpackNodeExternals()]
    
};
module.exports = merge(baseConfig, config);