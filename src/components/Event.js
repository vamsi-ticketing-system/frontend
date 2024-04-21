import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { IoIosTime } from "react-icons/io";
import { PiCertificateFill } from "react-icons/pi";


import { ROUTES } from '../utils/Routes';
import { Button } from '@mui/material';


function Event() {
    const navigate = useNavigate();
    
 
    
    const selectedTicket = useSelector((state) => state.ticket.selectedTicket );
    
    useEffect(()=>{
        if(selectedTicket == null){
            navigate(ROUTES.EXPLORE);
        }
        
    },[]); 

    const goToTills = () =>{
        navigate(ROUTES.TILLS)
    }
    
  
    return (
        <div className='flex flex-col flex-auto relative  p-4 overflow-auto'>
            <div className='flex flex-row relative'>
                <div className='flex flex-col flex-auto p-2 gap-4 relative'>
                    <div className='flex flex-col lg:flex-row gap-2 z-[1]'>
                        <div className='flex flex-col gap-2 items-center'>
                            <div className='min-w-[200px] max-w-50'>
                                <img className='object-contain hover:scale-95 rounded-xl duration-300' style={{maxHeight:"250px"}} src={selectedTicket?.poster_link}></img>
                            </div>
                            <Button className='flex' variant='contained' onClick={goToTills} >Book Tickets</Button>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-2xl'>{selectedTicket?.title}</span>
                            <div className='flex flex-row gap-2'>
                                <span className='flex flex-row gap-2 items-center text-md'><PiCertificateFill className='text-[24px] text-[#f9b939]' />{selectedTicket?.certificate}</span>
                                <span className='flex flex-row gap-2 items-center text-md'><IoIosTime className='text-[24px] text-[#f9b939]' /> {selectedTicket?.duration}</span>
                            </div>
                            <div>
                                {selectedTicket?.description}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Event
