import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends React.Component {
    componentWillMount(){
        console.log('component will mount----');
    }
    componentDidMount() {
        console.log('component did mount----');
        // unnecessary as data from this is fetched at server side and passed as initail state to redux store at client

        // this.props.fetchUser();

        // if user req some other page like home page we would not render user list which means no load data func in this (dont have initial list of users) but if navigated to this and did not habe some initial data here then never that content on that page

    }
    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>
        })
    }

    head() {
        return(
        <Helmet>
            <title>{`${this.props.users.length} Users Loaded` } </title>
            <meta property="og:title" content="Users app" />
        </Helmet>)
    }

    render() {
        return (
            <div>
                {this.head()}
                List of users
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => (
    { users: state.users }
)

function loadData(store) {
    // console.log('i am trying to load some data');
    // manual dispatch
    return store.dispatch(fetchUser());
    // make network req to api and its going to return promise representing network req to make sure promise is created gets send back to index.js
    // 1. why we don't use connect func. to handle action creators
    // connect func works by communicating provider which has refernce to redux store
    // but we have to render our app before render
    //2. why dispatch
    // when we call action creator ,it returns action which  gets passed to dispatch func. of redux which pass it to all its middleware and then send result to reducer 
}
// named export
export { loadData };

export default {
    loadData,
    component: connect(mapStateToProps, { fetchUser })(UsersList)
};
// export default connect(mapStateToProps, { fetchUser })(UsersList)