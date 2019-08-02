import 'babel-polyfill';
// so that async -await can work
import express from 'express';
import {matchRoutes} from 'react-router-config';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
const app = express();

// browser ever makes a req to renderer server with route that begis with /api we will attempt to proxy it off and  send it to proxy server

//above every middleware we use proxy
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts){
        console.log('opts',opts);
        // standard header for identifying the original host requested by the client in the Host HTTP request header.
        opts.headers['x-forwarded-host'] = 'localhost:3000'
        return opts;
    }
    //third arg , just to make sure app work correctly with server
}));
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore(req);
    // console.log('store',store.getState());
    // store { users: [], auth: null, admins: [] }
    // console.log('----------------',matchRoutes(Routes, req.path));
    // [ { route:
    //     { component: [Function: App],
    //       loadData: [Function: loadData],
    //       routes: [Array] },
    //    match: { path: '/', url: '/', params: {}, isExact: false } },
    //  { route:
    //     { component: [Object],
    //       loadData: [Function: loadData],
    //       path: '/admins' },
    //    match: { path: '/admins', url: '/admins', isExact: true, params: {} } } ]
    // here we know given url that user is trying to visit which comp we need to render
    //which set of component about to be rendered for each req

    //some logic to initialize and load data in store

    // matchRoutes return array of promises representing all pending network req from all action creators that we end up calling
    const promises = matchRoutes(Routes, req.path).map(({route}) => {
        // pass store as arg to loadData so that it gets reference of server side store
       return route.loadData ? route.loadData(store) : null;
    }).map(promise => {
        if(promise){
            // console.log('promise',promise);
            //something gets render in error case also
            return new Promise((resolve, reject)=>{
                promise.then(resolve).catch(resolve);
            })
        }
    })
    // console.log('promisessssssss',promises);
    // now store has updated data

    const render = ()=>{
        // if any of promise failed from array of promises then catch statement execute
        const context = {};
    
        //putting data into redux store render the app and sending the result back down to user
        // inside renderer we inspect context object and if it has notFound prop then we update the resp status code as 404.
        const content = renderer(req, store, context);
        if(context.url){
            return res.redirect(301, context.url);
        }
        // console.log('-----------',context);
        if(context.notFound){
            res.status(404);
        }
        res.send(content);
    }
    Promise.all(promises).then(render).catch(render);
    // promise.all take array of promises return a promise(when all promises resolved it also resolve)
    // have some data loaded before actually render the app

    
   
})
app.listen(3001, () => {
    console.log('listening 3001');
});

// this time diff coding style at server and client (server plain and client - es6)
// should be same(node still doesnt follow es6)
// code is serverd by webpack so we can use es6