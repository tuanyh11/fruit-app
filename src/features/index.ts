import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  cart: cartSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const root = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(root)

export default root

export type RootState = ReturnType<typeof root.getState>;

