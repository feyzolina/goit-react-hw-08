import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/slice';
import filtersReducer from './filters/slice';
import contactsReducer from './contacts/slice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        filters: filtersReducer,
        contacts: contactsReducer,
    },
});

export const persistor = persistStore(store);
