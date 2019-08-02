import { createStore, applyMiddleware } from 'redux';
// import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
// need some way to detect all load action creators are completed in server
import reducers from '../client/reducers';

export default (req) => {
    const axiosInstance = axios.create({
        // no proxy that is going to take req that is being issued on server and take  on to heroku app 
        baseURL: ' http://react-ssr-api.herokuapp.com',
        // attach coookie from incoming req from user browser
        headers: { cookie: req.get('cookie') || '' }

        // whenever this axios instance is used to make req to API, API is going to absolutely think that req is coming from real user
    })
    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
    return store;
}

// localhost:3000/admins