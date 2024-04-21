import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function IsLoginGaurd() {
    let isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);   
    
    if(isLoggedIn){
        return <Navigate to={'/home'} />
    }
    else{
        return <Outlet />
    }
}

export default IsLoginGaurd
