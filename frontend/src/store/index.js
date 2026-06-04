import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js'
import projectReducer from './slices/projectsSlice.js'
import walletSlice from './slices/walletSlice.js';
import investmentSlice from './slices/investmentSlice.js';
import modalSlice from './slices/modalSlice.js';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        wallet: walletSlice,
        investments: investmentSlice,
        modal: modalSlice,
    }
})