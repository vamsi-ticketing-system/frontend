import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../utils/API';
import { useSelector } from 'react-redux';
import { ticketActions } from '../store/ticket';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../utils/Routes';
import { defaultDateFormat } from '../utils/Shared';
import { RiArmchairFill } from "react-icons/ri";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoIosTime } from 'react-icons/io';

import { Button } from '@mui/material';

function SeatSelection({close}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedTicket = useSelector((state)=> state.ticket.selectedTicket)
    const selectedTheater = useSelector((state)=> state.ticket.selectedTheater);
    const selectedEventRelease = useSelector((state)=> state.ticket.selectedEventRelease);

    const [seatStatus,setSeatStatus] = useState();
    // const [selectedSeats,setSelectedSeats] = useState({});
    const [selectedSeatNumbers,setSelectedSeatNumbers] = useState([]);
    const [serverResponseMessage,setServerResponseMessage] = useState(null);

    useEffect(()=>{
        if(selectedTicket === null){
            navigate(ROUTES.EXPLORE);
        }
        else{
            console.log(selectedTheater);
            updateTheaterSeatsInfo();
            fetchSeatStatus();
        }
        
    },[])


    const fetchSeatStatus = async (event_release_id) =>{
        let seatStatus = await API.GetMethod(`seat-status/${selectedEventRelease._id}`);
        console.log(seatStatus);
        setSeatStatus((previousValue) => previousValue = seatStatus['data']);
        return seatStatus['data'];
    }

    const confirmTickets = async ()=>{
        let seatStatus = await API.PostMethod(`pre-booking`,{
            "event_release_id": selectedEventRelease._id,
            "seats": selectedSeatNumbers
        }).then((bookHistory)=>{
            // dispatch(ticketActions.selectTicket(null));
            // dispatch(ticketActions.selectedShow(null));
            dispatch(ticketActions.updateTransactionInfo(bookHistory))
            navigate("/home/payment-confirmation");
        }).catch((error)=>{
            console.log(error['response']['data']['errors'][0]);
            setServerResponseMessage((prevValue) => prevValue = error['response']['data']['errors'][0]['message'])
            fetchSeatStatus();
        });
        console.log(seatStatus);
    }

    const chosenSeats = (selectedRow,selectedSeat) => {
        setServerResponseMessage((prevValue) => prevValue = null);
        let selectedShowData = JSON.parse(JSON.stringify(selectedTheater));
        for(let row of selectedShowData.rows){
            if(row.row === selectedRow.row){
                for(let seat of row.seats){
                    if(seat.seat === selectedSeat.seat){
                        seat['selected'] = !selectedSeat.selected;

                        let ss = selectedSeatNumbers;
                        
                        if(selectedSeat.selected) {
                            delete ss.splice(ss.indexOf(seat.seat),1);
                        }
                        else{
                            ss.push(seat.seat);
                        }
                        setSelectedSeatNumbers( (previousValue) => previousValue = ss);

                        break;
                    }
                }
            }
        }

        dispatch(ticketActions.updateSeatMappings(selectedShowData.rows))
    }

    const updateTheaterSeatsInfo = ()=>{
        
        let seats = [...Array(selectedTheater?.seats_per_row+1).keys()].map((val)=> { return { seat: val } });
        seats.shift()
        
        let rows = 'abcdefghijklmnopqrstuvwxyz'
                    .toUpperCase()
                    .split('')
                    .slice(0,selectedTheater?.no_of_rows)
                    .map((rowval)=> { 
                        return {'row': rowval , seats: [...Array(selectedTheater?.seats_per_row+1).keys()].map((seatval)=> { return { seat: `${rowval}${seatval+1}`, selected: false, seat_number: seatval+1  } })} })
        rows.reverse();
        dispatch(ticketActions.updateSeatMappings(rows));
        
    }

    const renderChoosenSeats = () =>{
        return (<span className='flex flex-row items-center gap-2'><RiArmchairFill  className='text-[green]'/> &nbsp;{selectedSeatNumbers.join(",") || "-" }</span>)
    }

    const appendEmptySpace = (seat) =>{
        if(seat.seat_number === 5 || seat.seat_number === 10 || seat.seat_number === 15 || seat.seat_number === 20 || seat.seat_number === 25)
            return (<div className='seat-style'></div>);
        else
            return <></>
    }

    return (
        <div className='flex flex-row flex-auto w-full overflow-auto'>
            {
                selectedEventRelease ? 
                <div className='flex flex-col flex-auto gap-2 w-full  '>
                    <div className='flex flex-col flex-auto bg-white w-full h-full drop-shadow-md p-4 gap-2 rounded'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between'>
                                <span className='text-lg'>{selectedTicket?.title}</span>
                                <span className='text-lg flex flex-row items-center gap-2'>{selectedTheater?.name} <BiSolidCameraMovie className='text-[#f9b939]' /></span>
                            </div>
                            <div className='flex row justify-between'>
                                {renderChoosenSeats()}
                                <span className='text-lg flex flex-row gap-2 items-center'>
                                    {defaultDateFormat(selectedEventRelease?.event_date)} {selectedEventRelease?.event_time}
                                    <IoIosTime  className='text-[#f9b939]'/>
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-row flex-auto border-2  p-4 overflow-auto'>
                            <div className='flex flex-col w-full  overflow-auto gap-2' >
                                <div className='flex flex-col'>
                                    <div className='min-w-4'></div>
                                    <div className='screen self-center'>Screen</div>
                                </div>
                                <div className='flex flex-col  p-2 justify-center gap-2 '>
                                    {
                                        selectedTheater && selectedTheater?.rows && selectedTheater.rows.map((row)=>{
                                            return (
                                            <div key={row.row} className='flex flex-row lg:justify-center gap-2'>
                                                <div className='min-w-4'>{row.row}</div> 
                                                <div className='flex flex-row  gap-1'>
                                                    {
                                                        row.seats.map((seat)=>{
                                                            
                                                            if(seatStatus &&  (seatStatus[`${seat.seat}`] === 'Pending' || seatStatus[`${seat.seat}`] === 'Confirmed')){
                                                                return (
                                                                    <div className='flex flex-row items-center  gap-2'>
                                                                        <div key={seat.seat} className='seat-style filled-seat'>
                                                                            {seat.seat_number}
                                                                        </div>
                                                                        {
                                                                            appendEmptySpace(seat)
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                            else{
                                                                return (
                                                                <div className='flex flex-row items-center  gap-2'>
                                                                    <div key={seat.seat} onClick={() => chosenSeats(row,seat)} 
                                                                        className={`seat-style cursor-pointer ${seat?.selected ? 'selected-seat' : 'available-seat'}`}>
                                                                            {seat.seat_number}
                                                                    </div>
                                                                    {
                                                                        appendEmptySpace(seat)
                                                                    }
                                                                </div>)
                                                            }
                                                        })
                                                    }
                                                    
                                                </div>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <span>
                                {serverResponseMessage}
                            </span>
                        </div>
                        <div className='flex flex-col flex-row justify-end'>
                            <div className='flex flex-row justify-end'>
                                <Button onClick={close} className='bg-sky-500 text-white p-2 rounded-md'>Close</Button>
                                <Button onClick={()=> { confirmTickets() }} className='bg-sky-500 text-white p-2 rounded-md'>Proceed</Button>
                            </div>
                        </div>
                    </div> 
                    
                </div> : <></>
            }
           
        </div>
    )
}

export default SeatSelection
