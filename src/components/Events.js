import React, { useEffect, useReducer, useState } from 'react';
import * as API from '../utils/API';
import EventCard from './EventCard';

const FILTER_INITIAL_VALUE = {
    languages: [],
    genres: []
}

const reducerfilterState = (state,action) => {
    switch(action.type){
        case "DEFAULT":
            return {...FILTER_INITIAL_VALUE, languages : action?.payload?.languages || [] }
        case "LANGUAGES_UPDATE":
            return {...state, languages : state.languages.indexOf(action?.payload) === -1 ? [...state.languages ,action?.payload] : state.languages.filter((lan) => lan !== action?.payload) }
        case "GENRES_UPDATE":
            return {...state, genres : state.genres.indexOf(action?.payload) === -1 ? [...state.genres ,action?.payload] : state.genres.filter((gen) => gen !== action?.payload) }
        default: 
            return { ...state}
    }
}

function Events() {

    const [filtersState,dispatchFilterState] = useReducer(reducerfilterState,FILTER_INITIAL_VALUE);

    const [eventsList,setEventsList] = useState([]);
    const [languagesList,setLanguagesList] = useState([]);
    const [genresList,setGenresList] = useState([]);

    const fetchEvents = async (payload) =>{
        payload = payload || filtersState;
        
        let query = '';
        if(payload && payload.languages)
            query = query+`languages=${payload?.languages?.join("|")}`

        if(payload && payload.genres)
            query = query+`&genres=${payload?.genres?.join("|")}`
        

        let tickets = await API.GetMethod(`events?${query}`);
        setEventsList(previousValue => previousValue = tickets?.data?.data || []);
    }

    useEffect(()=>{
        bindMethod();
    },[]);

    useEffect(()=>{
        fetchEvents();
    },[filtersState])

    const bindMethod = async () =>{
        let payload = null
        await updatefilters(payload);
        await fetchLanguages();
        await fetchGenres();
        await fetchEvents(payload);

    }

    const updatefilters = async (paylod) =>{
        await dispatchFilterState({type: "DEFAULT", payload: paylod });
    }

    const fetchLanguages = async () =>{
        let languages = await API.GetMethod('languages');
        setLanguagesList(previousValue => previousValue = languages.data.data); 
    }

    const fetchGenres = async () =>{
        let genres = await API.GetMethod('genres');
        setGenresList(previousValue => previousValue = genres.data.data); 
    }

    return (
        <div className='flex flex-col lg:flex-row flex-auto gap-2 overflow-auto'>
            <div className='lg:basis-[20%] m-2 lg:my-4 lg:gap-2 lg:p-2 lg:overflow-auto'>
                <div className='flex flex-row lg:flex-col gap-2'>
                    <div className='flex flex-col'>
                        <div>Languages</div>
                        <div className='flex flex-row flex-wrap gap-2 bg-[#ddd] p-2 rounded'>
                            {
                                languagesList && languagesList.map((language)=>{
                                    return (
                                        <div    className={`${filtersState?.languages?.indexOf(language._id) >=0 ? 'bg-[green] text-white' : 'bg-white'}  drop-shadow-md p-1 p-x-2 rounded cursor-pointer`} 
                                                key={language._id}
                                                onClick={()=>{ dispatchFilterState({type:"LANGUAGES_UPDATE",payload: language._id}) }}
                                                >
                                            {language.language}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div>Genres</div>
                        <div className='flex flex-row flex-wrap gap-2 bg-[#ddd] p-2 rounded'>
                            {
                                genresList && genresList.map((genre)=>{
                                    return (
                                        <div    className={`${filtersState?.genres?.indexOf(genre._id) >=0 ? 'bg-[green] text-white' : 'bg-white'} drop-shadow-md p-1 rounded cursor-pointer`}  
                                                key={genre._id}
                                                onClick={()=>{ dispatchFilterState({type:"GENRES_UPDATE",payload: genre._id}) }}>
                                            {genre.genre}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    {/* <Autocomplete
                        className='flex basis-1/4 bg-white'
                        multiple
                        options={languagesList}
                        getOptionLabel={(option) => option.language}
                        value={filtersState.languages}
                        onChange={(event,value)=>{ dispatchFilterState({type:"LANGUAGES_UPDATE",payload: { languages: value }}) }}
                        isOptionEqualToValue={(option, value) => option.language_id === value.language_id}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Languages"
                        />
                        
                        )}
                    />
                    <Autocomplete
                        className='flex basis-1/4 bg-white' 
                        multiple
                        options={genresList}
                        getOptionLabel={(option) => option.genre}
                        value={filtersState.genres}
                        onChange={(event,value)=>{ dispatchFilterState({type:"GENRES_UPDATE",payload: { genres: value }}) }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                        
                            placeholder="Genres"
                        />
                        )}
                    /> */}
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-2 p-2 lg:my-4 justify-start overflow-auto'>
                {
                    eventsList && eventsList.length > 0 && eventsList.map((event)=>{
                    return(
                            <EventCard key={event._id} event={event} />
                    )
                    })
                }
            </div>
        </div>
    )
}

export default Events
