import React from 'react';
import {renderRoutes} from 'react-router-config';
import Header from './components/Header';
import {fetchCurrentUser} from './actions';
 const App = ({route}) => {
    //  console.log('route.routes',route.routes);
     return <div>
         <Header/>
     <h1>I am header</h1>
     {renderRoutes(route.routes)}</div>;
 }

 export default {
     component: App,
     loadData: ({dispatch}) => dispatch(fetchCurrentUser())
 };