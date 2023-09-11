
import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './reducers/orderSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export default store;


// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../redux/reducers/orderSlice'

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// })

// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './reducers/orderSlice';

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
