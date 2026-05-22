import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios.js";

const initialState = {
  items: [],
  selected: null,
  investors: [],
  loading: false,
  status: "idle",
  error: null,
};

export const fetchMyProjects = createAsyncThunk(
  "projects/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get("/projects/my-projects");
      console.log(data);
      return data.projects || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load projects.",
      );
    }
  },
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.get(`/projects/${id}`);
      return data.projects?.project || data.projects || data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load project.",
      );
    }
  },
);

export const closeProject = createAsyncThunk(
  "projects/closeProject",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.patch(`/projects/${id}`);
      return data.project;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to close project.",
      );
    }
  },
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete the project",
      );
    }
  },
);

export const fetchProjectInvestors = createAsyncThunk(
  "projects/fetchInvestors",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.get(`/projects/${id}/investors`);
      return data.investors || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load investors.",
      );
    }
  },
);

export const getAllProject = createAsyncThunk(
  "projects/allProjects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get(`/projects/all`);
      return data.projects;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete the project",
      );
    }
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selected = null;
      state.investors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProjects.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        ((state.loading = false), (state.items = action.payload));
      })
      .addCase(fetchMyProjects.rejected, (state, action) => {
        state.status = "failed";
        ((state.loading = false), (state.error = action.payload));
      })
      //   get project By ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   delete the project
      .addCase(deleteProject.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((p) => p._id !== id);
        if (state.selected?._id === id) state.selected = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload;
      })

      // close project
      .addCase(closeProject.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;
        state.selected = updated;
        const idx = state.items.findIndex((p) => p._id === updated._id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(closeProject.rejected, (state, action) => {
        state.error = action.payload;
      })

      // investors
      .addCase(fetchProjectInvestors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectInvestors.fulfilled, (state, action) => {
        state.loading = false;
        state.investors = action.payload;
      })
      .addCase(fetchProjectInvestors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // All projects

      .addCase(getAllProject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        ((state.loading = false), (state.items = action.payload));
      })
      .addCase(getAllProject.rejected, (state, action) => {
        state.status = "failed";
        ((state.loading = false), (state.error = action.payload));
      })

  },
});

export const { clearError, clearSelected } = projectSlice.actions;
export default projectSlice.reducer;
