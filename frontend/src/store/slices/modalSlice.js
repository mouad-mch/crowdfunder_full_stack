import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  amount: 0,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
        state.isModalOpen = true;
        state.amount = action.payload?.amount ?? 0;
    },
    closeModal: (state) => {       
        state.isModalOpen = false;
        state.amount = 0;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;