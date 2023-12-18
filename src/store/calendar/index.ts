import * as reducers from './reducers';
import * as selectors from './selectors';
import { getInitialState, SLICE } from './state';
import type { AppCalendarState } from './state';
import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
    name: SLICE,
    initialState: getInitialState(),
    reducers: reducers,
});

const { actions, reducer } = calendarSlice;

export { actions };
export { selectors };
export { reducer };
export { SLICE };
export type { AppCalendarState };
