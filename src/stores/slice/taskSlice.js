import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading:true,
    removeTasks:[]
  },
  reducers: {
    // getTasks: (state, action) => {
    //   state.items = action.payload;
    // },
    removeTasks:(state,action)=>{
      state.removeTasks.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      // .addCase(addTask.fulfilled, (state, action) => {

        // state.items.push(action.payload);
      // })
      // .addCase(removeTask.fulfilled, (state, action) => {
      //   state.items.splice(
      //     state.items.findIndex((todo) => todo.id === action.payload),
      //     1
      //   );
      // })
      // .addCase(updateTask.fulfilled, (state, action) => {
        // state.items[0].map((item) => {
        //    (item.id === action.payload.idtask) && (item.title = action.payload.title);
        // });
        // console.log('ful')
      // });
  },
});

export const getTasks = createAsyncThunk("tasks/getTasks", async (data) => {
  const res = await ApiClient.get("/api/tasks", {
    params: {
      limit: 3,
      page: data.currentPage,
    },
  });
  return res.data.data;
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
