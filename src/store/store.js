import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import { authApi } from './api/authApi';
import { productsApi } from './api/productsApi';
import { profileApi } from './api/profileApi';
import { staticApi } from './api/staticApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [staticApi.reducerPath]: staticApi.reducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }).concat(authApi.middleware, productsApi.middleware,profileApi.middleware,staticApi.middleware),
});

// Debug persistence
store.subscribe(() => {
  console.log('Redux state persisted:', store.getState());
});

export const persistor = persistStore(store);