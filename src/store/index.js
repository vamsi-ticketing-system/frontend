import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import ticketSlice from './ticket';

const store = configureStore({
    reducer: {
        auth:authSlice.reducer,
        ticket: ticketSlice.reducer
    }
});

export default store;

// const counterSlice = createSlice({
//     name:'counter',
//     initialState: { counter: 0 },
//     reducers: {
//         increment(state,action){
//             state.counter++;
//         },
//         decrement(state,action){
//             state.counter--;
//         },
//         addBy(state,action){
//             state.counter += action.payload;
//         }
//     }
// });

// export const actions = counterSlice.actions;

// const store = configureStore({
//     reducer: counterSlice.reducer
// })

// export default store;