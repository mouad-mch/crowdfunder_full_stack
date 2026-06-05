import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

const initialState = {
    balance: 0,
    loading: false,
    error: null,
}


export const fetchBalance = createAsyncThunk(
    "wallet/fetchBalance",
    async (userId, { rejectWithValue }) => {
        try {
            const data = await api.get(`/users/${userId}`);
            return data.data.balance;
        }catch(err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const deposit = createAsyncThunk(
    "wallet/deposit",
    async ({ amount }, { rejectWithValue }) => {
        try {
            const data = await api.post(`/users/deposit`, { amount });
            return data.data.balance;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchBalance.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchBalance.fulfilled, (state, action) => {
            state.loading = false;
            state.balance = action.payload;
          })
          .addCase(fetchBalance.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch balance";
          })
          .addCase(deposit.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(deposit.fulfilled, (state, action) => {
              state.loading = false;
              state.balance = action.payload;
          })
          .addCase(deposit.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload || "Failed to deposit funds";
          });
    }
});

export const { clearError } = walletSlice.actions;
export default walletSlice.reducer;