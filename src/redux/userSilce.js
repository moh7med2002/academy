import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser:null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    successLogin: (state,action) => {
        state.currentUser=action.payload.user;
    },
    logout:(state)=>{
        state.currentUser=null;
    },
    updateStudent:(state,action)=>
    {
      state.currentUser.student = action.payload.student
    }
  },
})

export const { successLogin ,logout,updateStudent} = counterSlice.actions

export default counterSlice.reducer