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
        state.items.push(action.payload);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items[0].push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items[0].splice(
          state.items[0].findIndex((todo) => todo.id === action.payload),
          1
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items[0].map((item) => {
           (item.id === action.payload.idtask) && (item.title = action.payload.title);
        });
      });
  },
});

export const getTasks = createAsyncThunk("cates/getTasks", async () => {
  const res = await ApiClient.get("/api/tasks");
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
    await ApiClient.patch(`/api/tasks/${dataUpdate.idtask}`, {
      title: dataUpdate.title,
      categoryIds: [dataUpdate.categoryIds],
      status: "IN_PROGRESS",
    });
    return dataUpdate;
  }
);
export default taskSlice;
