import React from 'react';

// Internally static router rename its props from context to staticContext
// when we try to render this comp in client side context doesnot exist
const NotFoundPage = ({staticContext = {}}) => {
    staticContext.notFound=true;
    return <h1>Oops, route not found.</h1>
};

export default {
    component: NotFoundPage
}