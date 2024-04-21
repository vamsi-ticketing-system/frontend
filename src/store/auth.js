import { createSlice  } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth-store',
    initialState:{ isLoggedIn:false, userInfo:null },
    reducers:{
        login(state,action){
            state.isLoggedIn = true;
            state.userInfo = action.payload;
        },
        logout(state,action){
            state.isLogged = false;
            state.userInfo = null;
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice;