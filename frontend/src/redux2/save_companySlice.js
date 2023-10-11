import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
   users:[], 
};

export const saveCompanySlice = createSlice({
    name: 'save_company',
    initialState,
    reducers: {
        saveCompany: (state, action) => {
            const company ={
                id: action.payload.id,
                company: action.payload.company,
                email: action.payload.email,
                password: action.payload.password,
            }
            const existingCompany = state.users.find((user) => user.id === action.payload.id);
            if (!existingCompany) {
                 state.users.push(company);
              }
        }
    },
})

export const { saveCompany } = saveCompanySlice.actions;

export default saveCompanySlice.reducer;