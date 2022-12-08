import {configureStore} from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import messageReducer from "./messageSlice";
import userReducer from "./userSlice";

import {setupListeners} from "@reduxjs/toolkit/query";
import {messagingAppApi} from "./appQueryV1";


export const store = configureStore({
    reducer: {
        contactReducer,
        messageReducer,
        userReducer,
        [messagingAppApi.reducerPath]: messagingAppApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(messagingAppApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)