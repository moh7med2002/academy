import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentParent : null,
}

    export const parentSlice = createSlice({
    name: 'parent',
    initialState,
    reducers: {
        successLogin: (state,action) => {
            state.currentParent = action.payload.parent;
        },
        logout:(state)=>{
            state.currentParent = null;
        }
    },
    })

// Action creators are generated for each case reducer function
export const { successLogin ,logout} = parentSlice.actions

export default parentSlice.reducer