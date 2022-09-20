import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
  },
  reducers: {
    getTasks: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.items=action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        // getTasks()
        // state.items.push(action.payload);
      })
      // .addCase(removeTask.fulfilled, (state, action) => {
      //   state.items.splice(
      //     state.items.findIndex((todo) => todo.id === action.payload),
      //     1
      //   );
      // })
      .addCase(updateTask.fulfilled, (state, action) => {
        // state.items[0].map((item) => {
        //    (item.id === action.payload.idtask) && (item.title = action.payload.title);
        // });
        // console.log('ful')
      });
  },
});

export const getTasks = createAsyncThunk("cates/getTasks", async (data) => {
  const res = await ApiClient.get("/api/tasks",{params:{
    limit:3,
    page:data.currentPage
  }}
  );
  return res.data.items;
});
export const addTask = createAsyncThunk(
  "cates/addTask",
  async (task, { rejectWithValue }) => {
    const res = await ApiClient.post("/api/tasks", task);
    return res.data;
  }
);
export const removeTask = createAsyncThunk(
  "cates/removeTask",
  async (idtask) => {
    await ApiClient.delete(`/api/tasks/${idtask}`);
    return idtask;
  }
);
export const updateTask = createAsyncThunk(
  "cates/updateTask",
  async (dataUpdate) => {
    await ApiClient.patch(`/api/tasks/${dataUpdate.id}`, dataUpdate.datatask);
    return dataUpdate;
  }
);
export default taskSlice;
