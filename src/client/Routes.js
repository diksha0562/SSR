// shared between both client and server side
import React from 'react';
import HomePage from './pages/HomePage';
import UsersListPage, {loadData} from './pages/UsersListPage';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

// export default () => {
//     return (
//         <div>
//             <Route exact path="/" component={Home} />
//             <Route path="/hi" component={() => 'Hi'} />
//             <Route path="/users" component={UsersList}/>
//         </div>
//     )
// }

// export default [
//     {   
//         ...HomePage,
//         path: '/',
//         exact: true
//     },{
//         ...UsersListPage,
//         path: '/users',
        
//     }
// ]


export default [
    {
        ...App,
        routes : [
            {   
                ...HomePage,
                path: '/',
                exact: true
            },{
                ...UsersListPage,
                path: '/users',
                
            },{
                ...AdminsListPage,
                path: '/admins',
                
            },{
                ...NotFoundPage
            }
        ]
    }
]
// export default [
//     {
//         ...App,
//         routes : [
//             {   
//                 component : HomePage,
//                 path: '/',
//                 exact: true
//             },{
//                 component : UsersListPage,
//                 path: '/users',
                
//             },{
//                 ...AdminsListPage,
//                 path: '/admins',
                
//             },{
//                 ...NotFoundPage
//             }
//         ]
//     }
// ]
// bcoz we have to use react-router-config lib