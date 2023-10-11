import { combinedReducers } from 'redux';
import {save_company_reducer} from './save_company_reducer'; 

const reducers =  combinedReducers({
    save_company: save_company_reducer,
    // Add multiple reducers here
})

export default reducers;