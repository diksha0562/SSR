import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';
import { Provider } from 'react-redux';
import {renderRoutes} from 'react-router-config';
import serialize from 'serialize-javascript';
import {Helmet} from 'react-helmet';

export default (req, store, context) => {
    // contains url that is requested by browser
    // console.log('store',store);
    // context required prop for StaticRouter 
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                {/* <Routes /> */}
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );
    // pull tags out of helmet lib
    const helmet = Helmet.renderStatic();
    // console.log('content',content);
    //make sure that we tell Home the actual browser after we generated all HTML that it needs to download that bundle.js file that is now available insode public dir
    return `
        <html>
            <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
            <div id="root">${content}</div>
            <script>
            window.INITIAL_STATE= ${serialize(store.getState())}
            </script>
            <script src="bundle.js"></script>
            </body>
        </html>
        `
//   window.INITIAL_STATE= ${JSON.stringify(store.getState())}



    // need to tell browser that go back to server and attempt to download this client side bundle
    // we setup this public dir with express so need not to append any  folder
};