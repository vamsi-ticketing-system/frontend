import { createSlice } from "@reduxjs/toolkit";


const ticketSlice = createSlice({
    name:'ticket-store',
    initialState: { selectedTicket: null, selectedTheater: null, selectedEventRelease: null, transactionInfo: null },
    reducers: {
        selectTicket(state,action){
            state.selectedTicket = action.payload;
        },
        scheduleEvents(state,action){
            if(state && state?.selectedTicket)
                state.selectedTicket.scheduledEvents = action.payload;
        },
        selectedShow(state,action){
            if(state && state?.selectedTicket){
                state.selectedTheater = action.payload.theater_info;
                state.selectedEventRelease = action.payload.event_release_info;
            }
        },
        updateSeatMappings(state,action){
            state.selectedTheater = {...state.selectedTheater, rows: action.payload}
        },
        updateTransactionInfo(state,action){
            state.transactionInfo = action.payload;
        },
        cleatTicket(state,action){
            state = null
        }
    }
})

export const ticketActions = ticketSlice.actions;
export default ticketSlice;