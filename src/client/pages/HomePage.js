import React from 'react';
const Home =() =>{
    return (
    <div className="center-align" style={{marginTop:'200px'}}>
    <h3>Welcome</h3>
    <p>Checkout these awesome features</p>
    </div>
    )
}
export default {
    component: Home
};
// export default Home;
//with current setup we are not sending down any js code to browser
//we make requset to route express server sends back HTML(only) from home component
// 1. getiing html or contant toshow up on screen
// 2. load react app (event handlers and action creators nad data loading requests)


