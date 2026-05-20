import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios.js";


const initialState = {
    items: [],
    selected: null,
    investors: [],
    loading: false,
    status:'idle',
    error: null,
};


export const fetchMyProjects = createAsyncThunk(
    "projects/fetchMine",
    async (_, { rejectWithValue }) => {
        try {
            const data  = await api.get("/projects/my-projects");
            console.log(data)
            return data.projects || [];
        }catch(error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load projects."
            );
        }
    }
)

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearSelected: (state) => {
            state.selected = null;
            state.investors = [];
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMyProjects.pending, (state) => {
            state.status = "loading"
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchMyProjects.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.loading = false,
            state.items = action.payload
          })
          .addCase(fetchMyProjects.rejected, (state, action) => {
            state.status = "failed"
            state.loading = false,
            state.error = action.payload
          })
    }


})

export const { clearError, clearSelected } = projectSlice.actions;
export default projectSlice.reducer;