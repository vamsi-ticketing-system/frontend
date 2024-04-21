import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';


import IsLoginGaurd from './gaurds/IsLoginGaurd';

import Events from './components/Events';
import PaymentConfirmation from './components/PaymentConfirmation';
import Tills from './components/Tills';
import Explore from './components/Explore';
import Event from './components/Event';
import BookingHistory from './components/BookingHistory';


function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route exact path='' element={<Navigate to="/home" />} />
            <Route path='/home' element={ <Home /> }>
              <Route path='' element={ <Navigate to="explore" /> } />
              <Route path='explore' element={ <Explore /> } />
              <Route path='events' element={ <Events /> } />
              <Route path='event' element={ <Event /> } />
              <Route path='tills' element={ <Tills /> } />
              {/* <Route path='seat-selection' element={ <SeatSelection /> } /> */}
              <Route path='payment-confirmation' element={ <PaymentConfirmation /> } />
              <Route path='booking-history' element= { <BookingHistory /> } />
            </Route>
            <Route element={ <IsLoginGaurd /> }>
              <Route path='/login' element={ <Login /> } />
            </Route>
            {/* <Route element={ <IsAuthenticated /> }>
              <Route path='/home' element={ <Home /> } />
            </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routing
