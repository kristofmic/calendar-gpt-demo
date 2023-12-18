import * as calendarSlice from './calendar';
import type { AppCalendarState } from './calendar';
import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore, AnyAction } from '@reduxjs/toolkit';

export const slices = {
    [calendarSlice.SLICE]: calendarSlice,
};
export type AppState = AppCalendarState;
type AppStore = EnhancedStore<AppState, AnyAction>;

let store: AppStore;
export function getStore() {
    if (!store) {
        store = configureStore({
            reducer: {
                [calendarSlice.SLICE]: calendarSlice.reducer,
            },
        });
    }

    return store;
}
