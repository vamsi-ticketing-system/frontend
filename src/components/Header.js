import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/Routes';

function Header() {
  const navigate = useNavigate();
  const userInfo = useSelector((state)=> state.auth.userInfo);
  return (
    <div className='bg-white p-2 drop-shadow-md h-14 flex justify-between z-index-[1]'>
        <div className='flex justify-between items-center logo-shape cursor-pointer' onClick={()=> navigate(ROUTES.EXPLORE)} >Ticketing system</div>
        <div>
          
        </div>
        <div className='flex justify-between items-center'>
            <div className='pe-2'>{userInfo?.full_name}</div>
            <span className="material-symbols-outlined cursor-pointer">
                account_circle
            </span>
        </div>
    </div>
  )
}

export default Header
