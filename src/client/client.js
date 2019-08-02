// root or entry of client side code base
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './Routes';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {renderRoutes} from 'react-router-config';
import axios from 'axios';
import App from './App';
import HomePage from "./pages/HomePage";
import UsersListPage from './pages/UsersListPage';

const axiosInstance = axios.create({
    baseURL: '/api'
})
// make axios instance here and it to all action creators automatically
//axiosInstance.get('/users')  ---- /api/users

//window.INITIAL_STATE -- initial redux data(server)
const store = createStore(reducer, window.INITIAL_STATE, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

ReactDom.hydrate(
    <Provider store={store}>
    <BrowserRouter>
    
    <div>{renderRoutes(Routes)}</div>
        {/* <Routes /> */}

    </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

// render the app in same div as one in the server

// we r not replacing all HTML rather telling react to setup all event handlers to existing structure

//entire process of putting functionality back into DOM that has alresdy rendered is referred to as hydration.
// ReactDOM.hydrate() is same as render(), but it is used to hydrate(attach event listeners) a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup.

//the process of rerendering over the once rendered HTML is known as hydration
// console.log('Hi there!!');



// {/* <BrowserRouter>
// <div> */}
// {/* <div>{renderRoutes(Routes)}</div> */}
//     {/* <Routes /> */}
//     {/* <App.component/> */}
//     {/* <Route exact path='/' component={HomePage} />
//     <Route path='/users' component={UsersListPage.component} />
//     </div>
// </BrowserRouter> */}
// console.log('hey');