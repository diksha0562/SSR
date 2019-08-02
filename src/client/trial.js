import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../common/components/App';
import Routes from '../helpers/Routes';
import { StaticRouter } from 'react-router-dom';
import { getBundles } from 'react-loadable-ssr-addon';
const manifest = require('../../dist/react-loadable-ssr-addon.json');
import Loadable from 'react-loadable';


export default (req, store) => {
    const modules = new Set();
    console.log('modules', modules);
    let content = renderToString(<Loadable.Capture report={moduleName => modules.add(moduleName)}>
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <Routes />
            </StaticRouter>
        </Provider>
    </Loadable.Capture>);
    const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);

    const styles = bundles.css || [];
    const scripts = bundles.js || [];
    console.log('content', content);
    return ` <html>
    <head>
    ${styles.map(style => {
            return `<link href="/dist/${style.file}" rel="stylesheet" />`;
        }).join('\n')}
    </head>
    <body>
        <div id="root">${content}</div>
        ${scripts.map(script => {
            return `<script src="../dist/${script.file}"></script>`
        }).join('\n')}
    </body>
    </html>`
}














import express from 'express';
// const express = require('express');
import renderer from './helpers/renderer';
// import MyjsPage from './myjs/containers/MyjsPage';
import {renderToString} from 'react-dom/server';
import App from './common/components/App';
import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
// import { getBundles } from 'react-loadable-ssr-addon';
// const manifest = require('../dist/react-loadable-ssr-addon.json');
// console.log('manifest',manifest);
const app = express();
import createStore from './helpers/createStore';

app.use('/',express.static(path.join('../', "dist")));


app.get('/',(req,res) => {
    const store = createStore(req);
  console.log('store',store)
   res.send(renderer(req,store));
})
Loadable.preloadAll().then(() => {
    app.listen(8081, () => {
      console.log('Running on http://localhost:8081/');
    });
  }).catch(err => {
    console.log(err);
  });
// "server":"webpack --config webpack.server.js --watch"

// 1. rerun webpack - watch
// 2. restart server - nodemon --watch build --exec \"node build/bundle.js\"

// nodemon only when there is any change in build dir execute  node build/bundle.js
// not everytime there is change in any src folder
//watch-- will see if any of the project files change it will rerun and rebuild bundle


 // through webpack build bndle then node build/bundle.js












 import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import LoginReducer from "./login/reducers/LoginReducer";
import ProfileReducer from "./viewProfile/reducers/ProfileReducer";
import MyjsReducer from "./myjs/reducers/MyjsReducer";
import AlbumReducer from "./photoAlbum/reducers/AlbumReducer"
import verifiedVisitReducer from "./verifiedVisit/reducers/verifiedVisitReducer"
import ForgotPasswordReducer from "./forgotPassword/reducers/ForgotPasswordReducer"
import Jsb9Reducer from "./common/reducers/Jsb9Reducer"
import contactEngineReducer from "./contact_engine/reducers/contactEngineReducer"
import SearchFormReducer from "./searchForm/reducers/SearchFormReducer";
import historyReducer from "./common/reducers/historyReducer";
import ListingReducer from "./listing/reducers/ListingReducer";

const store = createStore(combineReducers({LoginReducer,ProfileReducer,MyjsReducer,AlbumReducer,verifiedVisitReducer,Jsb9Reducer,ForgotPasswordReducer,contactEngineReducer,SearchFormReducer,historyReducer,ListingReducer}),{},applyMiddleware(thunk));


export default store;











import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import LoginReducer from "../login/reducers/LoginReducer";
import ProfileReducer from "../viewProfile/reducers/ProfileReducer";
import MyjsReducer from "../myjs/reducers/MyjsReducer";
import AlbumReducer from "../photoAlbum/reducers/AlbumReducer"
import verifiedVisitReducer from "../verifiedVisit/reducers/verifiedVisitReducer"
import ForgotPasswordReducer from "../forgotPassword/reducers/ForgotPasswordReducer"
import Jsb9Reducer from "../common/reducers/Jsb9Reducer"
import contactEngineReducer from "../contact_engine/reducers/contactEngineReducer"
import SearchFormReducer from "../searchForm/reducers/SearchFormReducer";
import historyReducer from "../common/reducers/historyReducer";
import ListingReducer from "../listing/reducers/ListingReducer";
import axios from 'axios';
export default (req) => {
const axiosInstance = axios.create({
    
    baseURL: 'http://jeevansathi.com',

    headers: { cookie: req.get('cookie') || '' }
})
const store = createStore(combineReducers({LoginReducer,ProfileReducer,MyjsReducer,AlbumReducer,verifiedVisitReducer,Jsb9Reducer,ForgotPasswordReducer,contactEngineReducer,SearchFormReducer,historyReducer,ListingReducer}),{},applyMiddleware(thunk.withExtraArgument(axiosInstance)));

return store;
}













const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//inform webpack that we are building a bundle for nodeJs, rather than for browser
    const config = {
    target: 'node',
    
    //tell webpack the root file of our server app
    entry: './src/server.js',

    //tell webpack where to put output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins:[
        new ExtractTextPlugin({
            filename: process.env.NODE_ENV !== 'devS' ? '[name].[chunkhash].style.css' : '[name].style.css',
            allChunks: true
          })
    ],
    externals: [webpackNodeExternals()],
//     module: {
//     rules: [
//         {
//             test: /\.js?$/,
//             loader: 'babel-loader',
//             //tell webpack not to run babel on certain directories
//             exclude : /node_modules/,
//             //options that we pass along to the babel loadder
//             //rules followed by babel to transpile the code
//             options: {
//                 presets: [
//                     //take all jsx and convert it to normal js function calls
//                     'react',
//                     // used to handle async code
//                     'stage-2',
//                     // run all diff transform rules needed for last 2 versions
//                     ['env', {targets: {browsers : ['last 2 versions']}}]

//                 ]
//             }
//         }
//     ]
// }
module:{
    loaders:[
      {
        test: /\.js$/,
        // include: SRC_DIR,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets:['react','stage-2',['es2015',{modules: false}]],
          plugins:["react-loadable/babel"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=icons/[name].[ext]"
      }
  
    ]
  }
};
module.exports = config;













var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var staticServer = require("./src/common/constants/apiServerConstants");
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');
console.log('ReactLoadableSSRAddon',ReactLoadableSSRAddon);
var SRC_DIR = path.resolve(__dirname,"src");
var DIST_DIR = null;
var fileNameConfig = '';
var publicPathConfig = '';
const NameAllModulesPlugin = require('name-all-modules-plugin');
if(process.env.NODE_ENV === 'production')
 {
   DIST_DIR = path.resolve(__dirname,"dist");
   fileNameConfig = "[name].[chunkhash].bundle.js";
   publicPathConfig = staticServer.STATIC_SERVER+'/spa/dist/';
 }
 else {
   DIST_DIR = path.resolve(__dirname,"dist");
   fileNameConfig = process.env.NODE_ENV !== 'devS' ?  "[name].[chunkhash].bundle.js" : "[name].bundle.js";
   publicPathConfig = '/spa/dist/';

}
config = {
  entry:
  {
    app: SRC_DIR,
    vendor: ['react', 'react-dom','axios','redux','react-redux']
  },
  output: {
    path: DIST_DIR,
    publicPath: publicPathConfig,
    filename: fileNameConfig
  },


module:{
  loaders:[
    {
      test: /\.js$/,
      include: SRC_DIR,
      exclude: /node_modules/,
      loader: "babel-loader",
      query:{
        presets:['react','stage-2',['es2015',{modules: false}]],
        plugins:[require('react-loadable/babel')]
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }
      })
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: "file-loader?name=icons/[name].[ext]"
    }

  ]
},
plugins: [
  new ReactLoadableSSRAddon({
    filename: 'react-loadable-ssr-addon.json',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: Infinity,
    filename: fileNameConfig,
  }),
  new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'template.html'),
      filename: path.join(DIST_DIR, 'index.html'),
      inject: 'body',
  }),
  new ExtractTextPlugin({
    filename: process.env.NODE_ENV !== 'devS' ? '[name].[chunkhash].style.css' : '[name].style.css',
    allChunks: true
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
     disableDotRule: true
    }
  }),
   new webpack.NamedModulesPlugin(),
   new webpack.optimize.CommonsChunkPlugin({
       name: 'runtime'
   }),
   new NameAllModulesPlugin()
],

devServer: {
     historyApiFallback: {
       disableDotRule: true,
     },
   },

}

module.exports = config;
