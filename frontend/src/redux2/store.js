import {configureStore} from '@reduxjs/toolkit';
import saveCompanyReducer from './save_companySlice';

export const store = configureStore({
    reducer: saveCompanyReducer,
    // reducer: {
        
    //     save_company: saveCompanyReducer,
    //     // Add multiple reducers here
    // },
});