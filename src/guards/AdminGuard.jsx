import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const AdminGuard = ({children}) => {

    const user = useSelector(({UserSlice}) => UserSlice.user);

    if(!user.username || user.role !== "1"){
        return <Navigate to="/login" />
    }

    return <div>{children}</div>;
};

export default AdminGuard;