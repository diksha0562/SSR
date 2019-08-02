import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default (ChildComponent)=>{
    class RequireAuth extends React.Component{
        render(){
            //Whenevr we create hOC we need to make surethat we take any of pops that we passed to hOC and pass them through to child component
           
                switch (this.props.auth){
                    case false: 
                    return <Redirect to='/'/>
                    case null:
                        <div>Loading....</div>
                    default: 
                        return <ChildComponent {...this.props}/>;
                }
            
        }
    }

    function mapStateToProps ({auth}){
        return {auth};
    }
    // connect helper to wrap RequireAuth comp that we just created
    return connect(mapStateToProps)(RequireAuth);

}