import React from 'react'
import { IoIosTime } from 'react-icons/io';
import { PiCertificateFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';

function EventInfo() {
    const selectedTicket = useSelector((state) => state.ticket.selectedTicket );

  return (
    <div className='flex flex-col flex-auto p-2 gap-4 relative'>
        <div className='flex flex-col lg:flex-row gap-2 z-[1]'>
            <div className='flex flex-col gap-2 items-center'>
                <div className='max-w-50'>
                    <img className='object-contain hover:scale-95 rounded-xl duration-300 max-h-[10rem]' alt={selectedTicket.title} src={selectedTicket?.poster_link}></img>
                </div>
            </div>
            <div className='flex flex-col'>
                <span className='text-2xl'>{selectedTicket?.title}</span>
                <div className='flex flex-row gap-4'>
                    <span className='flex flex-row gap-2 items-center text-md'><PiCertificateFill className='text-[24px] text-[#f9b939]' />{selectedTicket?.certificate}</span>
                    <span className='flex flex-row gap-2 items-center text-md'><IoIosTime className='text-[24px] text-[#f9b939]' /> {selectedTicket?.duration}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventInfo
