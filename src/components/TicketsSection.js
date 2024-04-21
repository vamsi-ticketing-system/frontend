import React, { useEffect, useReducer, useRef, useState } from 'react';
import * as API from '../utils/API';

import EventCard from './EventCard';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


const INITIAL_STATE = {
    scrollLeft: 0,
    scrollLeftMax:0,
    noOfCards: 5,
    defaultCardWidth: 225
}

const reducer = (state,action) =>{
    switch(action.type) {
        case "DEFAULT" :
            return {...INITIAL_STATE, scrollLeftMax: action.payload.scrollLeftMax,noOfCards: action.payload.noOfCards  };
        case "MOVED": 
            return {
                ...state, scrollLeft: action.payload.scrollLeft
            }
        case "UPDATE_SCROLL_LEFT_MAX":
            return {
                ...state, scrollLeftMax: action.payload.scrollLeftMax
            }
        default :{
            return {
                ...state
            }
        }
    }
}

function TicketsSection({language}) {

    const sliderRef = useRef(null);

    const [scrollPositions,dispatch] = useReducer(reducer,INITIAL_STATE);
    
    const [tickets,setTickets] = useState([]);
    
    const calculateUpdateDefaultStates = ()=>{
        let tempScrollLeftMax = sliderRef?.current?.scrollWidth - sliderRef?.current?.clientWidth;
        let tempNoOfCards = parseInt((sliderRef?.current?.clientWidth / scrollPositions.defaultCardWidth)/2);
        dispatch({type: "DEFAULT", payload: {scrollLeftMax: tempScrollLeftMax, noOfCards: tempNoOfCards }})
    }

    useEffect(()=>{
        bindMethod();
    },[]);

    const bindMethod = async () =>{
        await fetchTickets();
        setTimeout(()=>{
            calculateUpdateDefaultStates();
        },1000)
    }

    const fetchTickets = async () =>{
        let tickets = await API.GetMethod(`events?languages=${language._id}`);
        setTickets(previousValue => previousValue = tickets?.data?.data || []);
    }

    const scrollLeft = () =>{
        let tempScrollLeft = scrollPositions.scrollLeft- (scrollPositions.noOfCards * scrollPositions.defaultCardWidth);
        sliderRef.current.scrollLeft = tempScrollLeft;
        dispatch({type : "MOVED", payload: {scrollLeft: tempScrollLeft}});
    }

    const scrollRight = () =>{
        let tempScrollLeft = sliderRef.current.scrollLeft + (scrollPositions.noOfCards * scrollPositions.defaultCardWidth);
        sliderRef.current.scrollLeft = tempScrollLeft;
        dispatch({type : "MOVED", payload: {scrollLeft: tempScrollLeft}});

    }
    

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 relative'>
                {
                    scrollPositions?.scrollLeft > 0 ? 
                    <MdChevronLeft className='absolute z-index-1 self-center rounded-full bg-[#000000a3] text-[#fff] hover:cursor-pointer' onClick={scrollLeft} size={40} /> :
                    <></>
                }
                {
                    scrollPositions.scrollLeft >= scrollPositions.scrollLeftMax ? 
                    <></> :
                    <MdChevronRight className='absolute z-index-1 right-0 self-center rounded-full bg-[#000000a3] text-[#fff] hover:cursor-pointer' onClick={scrollRight} size={40} />
                }
                <div id="slider" ref={sliderRef} className='flex flex-row w-full overflow-x-scroll scroll whitespace-nowrap gap-2 scroll-smooth'>
                    {
                        tickets.map((event)=>{
                            return (
                                <EventCard className="inline-block w-[225px]" key={event._id} event={event} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TicketsSection
