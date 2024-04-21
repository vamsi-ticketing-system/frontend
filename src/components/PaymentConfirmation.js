import { Button } from '@mui/material';
import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as API from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/Routes';
import { ticketActions } from '../store/ticket';

const PAYMENT_INITIAL_STATE = {
    timer: 120
}

const reducerPayment = (state,action) => {
    switch(action.type){
        case "REDUCE_TIMER": {
            return {...state, timer: state.timer -1 } //state.timer > 0 ? state.timer -1 : state.timer}
        }
    }
}

function PaymentConfirmation() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const transactionInfo = useSelector((state)=> state.ticket.transactionInfo)
    const [paymentState,paymentDispatch] = useReducer(reducerPayment,PAYMENT_INITIAL_STATE);

    useEffect(()=>{
        if(transactionInfo == null){
            navigate(ROUTES.EXPLORE);
        }
        
        let intervalInstance = setInterval(function(){
            console.log(paymentState.timer);
            if(paymentState.timer > 0)
                paymentDispatch({type:"REDUCE_TIMER" })    
            else
                clearInterval(intervalInstance);
        },1000);

        return () => clearInterval(intervalInstance);
    },[paymentState.timer]);

    
    const proceedPayment = async () =>{
        let scheduleReleases = await API.PostMethod(`payment-confirmation`,{ "id": transactionInfo?._id });
        dispatch(ticketActions.cleatTicket());
        navigate(ROUTES.HISTORY);
    }

  return (
    <div className='flex flex-col  flex-auto justify-center items-center'>
        Here is the screen to capture the payment details
        <span>Expires in: {paymentState.timer}&nbsp;sec</span>
        <Button variant='contained' onClick={proceedPayment}>Proceed</Button>
    </div>
  )
}

export default PaymentConfirmation
