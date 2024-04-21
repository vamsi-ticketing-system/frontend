import React from 'react'

function ConfirmationCard({bh}) {
  return (
    <div key={bh._id} className={`flex flex-col bg-white drop-shadow-md p-2 cursor-pointer`}>
        <div className='flex flex-row gap-2 '>
        <div>
            <img className='h-20' src={bh?.event_release_info?.event_id?.poster_link} alt='Confirmed ticket info' ></img>
        </div>
        <div>
            <div className='text-lg'>{bh?.event_release_info?.event_id?.title}</div>
            <div>Seats: {bh?.seats.toString(",")}</div>
            <div>{bh?.event_release_info?.theater_id?.name}, {bh?.event_release_info?.theater_id?.address}</div>
        </div>
        </div>
    </div>
  )
}

export default ConfirmationCard
