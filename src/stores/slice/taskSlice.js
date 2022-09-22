import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    meta:[],
    loading:true,
    removeTasks:[]
  },
  reducers: {
    removeTasks:(state,action)=>{
      state.removeTasks=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.meta=action.payload.meta;
        state.loading = false;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
  },
});

export const getTasks = createAsyncThunk("tasks/getTasks", async (data) => {
  const res = await ApiClient.get("/api/tasks", {
    params: data,
  });
  return res.data;
});
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("/api/tasks", task);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (idtask) => {
    await ApiClient.delete(`/api/tasks/${idtask}`);
    return idtask;
  }
);
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (dataUpdate) => {
    await ApiClient.patch(`/api/tasks/${dataUpdate.id}`, dataUpdate.datatask);
    return dataUpdate;
  }
);
export default taskSlice;
