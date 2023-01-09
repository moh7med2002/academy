import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentTeacher:null,
    }

    export const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        successLogin: (state,action) => {
            state.currentTeacher = action.payload.teacher;
        },
        logout:(state)=>{
            state.currentTeacher=null;
        }
    },
    })

// Action creators are generated for each case reducer function
export const { successLogin ,logout} = teacherSlice.actions

export default teacherSlice.reducer