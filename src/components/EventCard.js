import React from 'react'

import { ticketActions } from '../store/ticket';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../utils/Routes';
import { useNavigate } from 'react-router-dom';

function EventCard({event}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectedTicketMethod = (ticket)=>{
        dispatch(ticketActions.selectTicket(ticket));
        navigate(ROUTES.EVENT)
    }

  return (
    <div key={event?._id} className=' min-w-[220px] max-w-[220px] max-h-[350px]  flex flex-col justify-end hover:bg-sky  cursor-pointer drop-shadow-md' onClick={() => selectedTicketMethod(event)}>
        <div className='flex flex-col flex-auto justify-center items-center poster-board relative'>
            <div className='flex flex-col flex-auto absolute bg-[#ddd] rounded h-full w-full'></div>
            <img className='p-2 rounded-xl object-contain max-h-[290px] hover:scale-95 align-self-center easy-in-out duration-300 z-[1]'  alt={event?.title}  src={event?.poster_link}></img>
        </div>
        <div>
            <div>
                {event?.title}
            </div>             
        </div>
    </div>
  )
}

export default EventCard
