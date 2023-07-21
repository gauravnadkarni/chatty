import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./components/auth/store/auth-slice";

export const store = configureStore({
    reducer: {
    // This is where we add reducers.
        [authSlice.name]: authSlice.reducer,
    // Since we don't have any yet, leave this empty
    },
    devTools: true,
});

/*export const store = () => configureStore({
    reducer: {
    // This is where we add reducers.
        [authSlice.name]: authSlice.reducer,
    // Since we don't have any yet, leave this empty
    },
    devTools: true,
});*/

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//export type AppStore = ReturnType<typeof store>;
//export type AppDispatch = ReturnType<AppStore["dispatch"]>;
//export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;
//export const wrapper = createWrapper<AppStore>(store);

export const wrapper = createWrapper<AppStore>(()=> (store));