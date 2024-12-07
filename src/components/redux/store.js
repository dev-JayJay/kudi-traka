import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import paymentPlan from './payment-planSlices'; 


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, paymentPlan); 

const store = configureStore({
  reducer: {
    planAmount: persistedReducer, 
  },
});

const persistor = persistStore(store); 

export { store, persistor };
