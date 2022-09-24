import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";

const cateSlice=createSlice({
    name:'category',
    initialState:{
        list:[],
        meta:[],
        error: null,
        isLoading:null,
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCategories.fulfilled,(state,action)=>{
                state.list=action.payload;
                state.error = false;
                state.isLoading = false;
            })
            .addCase(getCategories.rejected,(state)=>{
                state.error = true;
                state.isLoading = false;
            })
            .addCase(getCategories.pending,(state)=>{
                state.isLoading = true;
            })
    }
});

export const getCategories=createAsyncThunk('cates/getCategories',async(_, {rejectWithValue })=>{
    try {
        const res =await ApiClient.get("/api/categories")
        return res.data.data
    } catch (error) {
        return rejectWithValue(error)
    }
}
)
export default cateSlice