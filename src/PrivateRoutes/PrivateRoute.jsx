import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import LoadingCard from '../Components/LoadingState/DefaultLoading';
import { AuthContext } from '../AuthProvider/AuthContext';

const PrivateRoute = ({children}) => {
    const {pageLoading, user} = useContext(AuthContext);

    const location = useLocation();
    
    if(pageLoading) {
        return <LoadingCard></LoadingCard>;
    }

    if(!user) {
        return <Navigate state={location?.pathname} to={"/login"}></Navigate>
    }
    return children;
};

export default PrivateRoute;