import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const GuestGuard = ({children}) => {

    const user = useSelector(({UserSlice}) => UserSlice.user);

    if(user.username){
        return <Navigate to="/" />
    }

    return <>{children}</>;
};

export default GuestGuard;