import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import dailyRateReducer from './dailyRate/slice';
import diaryReducer from './diary/slice';
import { filterReducer } from './filter/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'], // user ve token localStorage'da saklanacak
};

const dailyRatePersistConfig = {
  key: 'dailyRate',
  storage,
  whitelist: ['dailyRate', 'notAllowedProducts'],
};

const diaryPersistConfig = {
  key: 'diary',
  storage,
  whitelist: ['products'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    dailyRate: persistReducer(dailyRatePersistConfig, dailyRateReducer),
    diary: persistReducer(diaryPersistConfig, diaryReducer),
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
