import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:'filters',
    initialState:{
        searchText:''
    },
    reducers:{
        changgSearchText:(state,action)=>{
            state.searchText=action.payload
        }
    }
})

export default filterSlice