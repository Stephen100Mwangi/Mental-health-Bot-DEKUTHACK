import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import UserReducer from '../features/users/user'

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,UserReducer)

const store = configureStore({
    reducer: {
    bot_User: persistedReducer
  }
})

const persistor = persistStore (store);

export {store, persistor};
