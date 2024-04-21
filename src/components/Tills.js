import React, { useEffect, useState } from 'react';

import { defaultDateFormat } from '../utils/Shared';

import { IoLocation } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";

import { ticketActions } from '../store/ticket';
import { Button, Dialog, DialogContent, MenuItem, Select } from '@mui/material';

import * as API from '../utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../utils/Routes';
import { useNavigate } from 'react-router-dom';
import SeatSelection from './SeatSelection';
import EventInfo from './EventInfo';

function Tills() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedTicket = useSelector((state) => state.ticket.selectedTicket );
    
    const [scheduledDates,setScheduledDates] = useState([]);
    const [scheduledLanguages,setScheduledLanguages] = useState([]);
    const [selectedDate,setSelectedDate] = useState(null);
    const [selectedLanguage,setSelectedLanguage] = useState(null);
    const [showSeatSelection,setShowSeatSelection] = useState(false);
    

    useEffect(()=>{
        bindInitialData();
    },[])

    useEffect(()=>{
        fetchScheduledReleaseForDate();
    },[selectedDate,selectedLanguage]);


    const bindInitialData = async () =>{
        await fetchScheduledReleaseLanguages();
    }

    const fetchScheduledReleaseLanguages = async ()=>{
        if(selectedTicket == null){
            navigate(ROUTES.EXPLORE);
        }
        else{
            let scheduleLanguages = await API.GetMethod(`open-tills/languages/${selectedTicket._id}`);
            let sLanguages = scheduleLanguages['data']
            setScheduledLanguages((prevValue) => prevValue = sLanguages)
            
            if(sLanguages && sLanguages.length>0){
                setSelectedLanguage((prevValue) => prevValue = sLanguages[0]._id);
                fetchScheduledReleaseDates(sLanguages[0]._id);
            }
            
        }   
    }

    const fetchScheduledReleaseDates = async (language_id)=>{
        if(selectedTicket == null){
            navigate(ROUTES.EXPLORE);
        }
        else{
            let scheduleDates = await API.GetMethod(`open-tills/dates/${selectedTicket._id}?language=${language_id}`);
            let sDates = scheduleDates['data']
            setScheduledDates((prevValue) => prevValue = sDates)
            if(sDates && sDates.length>0){
                setSelectedDate((prevValue) => prevValue = sDates[0]._id)
            }
        }   
    }

    const fetchScheduledReleaseForDate = async (event_date)=>{
        if(selectedTicket == null){
            navigate(ROUTES.EXPLORE);
        }
        else{
            let ed = event_date || selectedDate
            let sl = selectedLanguage;
            if(ed && sl){
                let scheduleReleases = await API.PostMethod(`open-tills`,{ "id": selectedTicket._id, "event_date": ed, language_id: sl });
                if(selectedTicket){
                    dispatch(ticketActions.scheduleEvents(scheduleReleases['data']));
                }
            }
        }   
    }

    
    const showSeatingSelection = async (event_release_info,theater_info)=>{
        
        dispatch(ticketActions.selectedShow({event_release_info,theater_info}));
        setShowSeatSelection((prevValue) => prevValue = true);
        //navigate(ROUTES.SEAT_SELECTION);
    }

    const closeSeatingSelection = ()=>{
        setShowSeatSelection((prevValue) => prevValue = false)
    }

  return (
    <div>
        <EventInfo />
        {
            scheduledLanguages && scheduledLanguages.length > 0 ?
            <div className='flex flex-auto z-[1]'>
                <div className='flex flex-col flex-auto drop-shadow-md gap-2 lg:min-w-[50%]'>
                    <div className='flex flex-row justify-between gap-3'>
                        <div className='flex flex-row gap-2 p-2'>
                            {
                                scheduledDates && scheduledDates.map((sdate)=>{
                                    return (
                                        <div    key={sdate._id} 
                                                onClick={()=>{ setSelectedDate((prevValue) => prevValue = sdate._id ) }}
                                                className={`${selectedDate === sdate.event_date ? 'bg-[green] text-white': 'bg-white'} 
                                                            rounded text-center cursor-pointer drop-shadow-md place-content-center p-2`}>
                                            {defaultDateFormat(sdate.event_date)}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='flex flex-row gap-2 p-2'>
                            <Select value={selectedLanguage || null} onChange={(event)=> setSelectedLanguage((prevValue) => prevValue = event.target.value ) }>
                                {
                                    scheduledLanguages && scheduledLanguages.map((language)=>{
                                        return (
                                            <MenuItem key={language._id} value={language._id}>{language.language_info.language}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        { selectedTicket?.scheduledEvents?.length > 0 && selectedTicket?.scheduledEvents.map((scheduledEvent)=>{
                            return (
                                <div className='flex flex-row p-2 bg-[#fff] rounded mx-2 drop-shadow-md' key={scheduledEvent?._id}>
                                    <div className='flex flex-col flex-auto'>
                                        <div className='flex flex-row justify-between'>
                                            <div className='flex flex-row gap-2 items-center'><BiSolidCameraMovie className='text-xl text-[#f9b939]' /> {scheduledEvent?.theater_info.name}</div>
                                            <div className='flex flex-row gap-2 items-center'>{scheduledEvent?.theater_info.address} <IoLocation className='text-[24px] text-[#f9b939]' /> </div>
                                        </div>
                                        <div className='flex flex-row gap-2'>
                                            {
                                                scheduledEvent?.schedules?.length > 0 && scheduledEvent?.schedules.map((event_release)=>{
                                                    return (
                                                        <Button key={event_release._id} onClick={() => { showSeatingSelection(event_release,scheduledEvent.theater_info);  }} className='flex flex-col justify-center items-center' variant='outlined'>
                                                            {/* <div>{event_release.event_date}</div> */}
                                                            <div>{event_release.event_time}</div>
                                                        </Button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div> : 
            <div>Tickets have not released yet.</div>
        }
         <Dialog
            sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: "90%" } }}
            maxWidth="lg"
            open={showSeatSelection}
            className='p-0 seat-selection'
            >
                <DialogContent dividers>
                    <SeatSelection close={closeSeatingSelection} />
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default Tills
