import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

const initialState = {
    investments: [],
    portfolio: null,
    loading: false,
    error: null,
}

export const fetchMyInvestments = createAsyncThunk(
    "investments/fetchMine",
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get("/investments/my-investments");
            return data.investments || [];
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const fetchPortfolio = createAsyncThunk(
    "investments/fetchPortfolio",
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get("/investments/portfolio");
            return data.profile || null;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const makeInvestment = createAsyncThunk(
    "investments/make",
    async ({ projectId, amount }, { rejectWithValue }) => {
        try {
            const data = await api.post(`/projects/${projectId}/invest`, { amount });
            return data.investment;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const investmentSlice = createSlice({
    name: "investments",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyInvestments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyInvestments.fulfilled, (state, action) => {
                state.loading = false;
                state.investments = action.payload;
            })
            .addCase(fetchMyInvestments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch investments";
            })
            .addCase(fetchPortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolio = action.payload;
            })
            .addCase(fetchPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch portfolio";
            })
            .addCase(makeInvestment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(makeInvestment.fulfilled, (state, action) => {
                state.loading = false;
                state.investments.push(action.payload);
            })
            .addCase(makeInvestment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to make investment";
            })
    }


})

export const { clearError } = investmentSlice.actions;
export default investmentSlice.reducer;