import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function IsAuthenticated() {
    let isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);   

    if(isLoggedIn){
        return <Outlet />
    }
    else{
        return <Navigate to={'/login'} />
    }
  
}

export default IsAuthenticated



