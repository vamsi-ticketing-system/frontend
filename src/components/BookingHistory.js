import React, { useEffect, useState } from 'react';
import  * as API from '../utils/API';
import ConfirmationCard from './ConfirmationCard';

function BookingHistory() {
  const [bookingHistory,setBookingHistory] = useState([]);


  useEffect(()=>{
    fetchHistory();
  },[])

  const fetchHistory = ()=>{
    API.GetMethod("booking-history").then((response)=>{
      setBookingHistory((prevValue) => prevValue = response['data']);
    });
  }

  return (
    <div className='flex flex-col gap-4 p-2 overflow-auto'>
      {
        bookingHistory && bookingHistory.map((bh)=>{
          return (
            <ConfirmationCard key={bh.booking_id} bh={bh} />
          );
        })
      }
    </div>
  )
}

export default BookingHistory;
