import { getCalendarMeetingKey } from '../../utils/dateUtils';
import type { Meeting, State } from './state';
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export const setSelectedDate: CaseReducer<State, PayloadAction<Date>> = (state, { payload }) => {
    state.selectedDate = payload;
};

export const today: CaseReducer<State> = (state) => {
    const today = new Date();

    state.selectedDate = today;
};

export const nextDate: CaseReducer<State> = (state) => {
    const { selectedDate } = state;
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    state.selectedDate = tomorrow;
};

export const previousDate: CaseReducer<State> = (state) => {
    const { selectedDate } = state;
    const yesterday = new Date(selectedDate);
    yesterday.setDate(yesterday.getDate() - 1);
    state.selectedDate = yesterday;
};

export const showMeetingDetails: CaseReducer<State, PayloadAction<Meeting>> = (
    state,
    { payload },
) => {
    state.showMeetingDetails = true;
    state.meetingDetails = payload;
};

export const dismissMeetingDetails: CaseReducer<State> = (state) => {
    state.showMeetingDetails = false;
    state.meetingDetails = undefined;
};

export const updateMeeting: CaseReducer<State, PayloadAction<Meeting>> = (
    state,
    { payload: nextMeeting },
) => {
    state.showMeetingDetails = false;
    state.meetingDetails = undefined;

    const prevMeeting = state.meetings[nextMeeting.id];
    const prevMeetingCalendarKey = getCalendarMeetingKey(prevMeeting.startTime);
    const nextMeetingCalendarKey = getCalendarMeetingKey(nextMeeting.startTime);
    if (prevMeetingCalendarKey !== nextMeetingCalendarKey) {
        state.calendarMeetings[prevMeetingCalendarKey] = state.calendarMeetings[
            prevMeetingCalendarKey
        ].filter((id) => id !== prevMeeting.id);
        state.calendarMeetings[nextMeetingCalendarKey] =
            state.calendarMeetings[nextMeetingCalendarKey] || [];
        state.calendarMeetings[nextMeetingCalendarKey].push(nextMeeting.id);
    }

    state.meetings[nextMeeting.id] = nextMeeting;

    state.selectedDate = nextMeeting.startTime;
};

export const saveNewMeeting: CaseReducer<State, PayloadAction<Meeting>> = (
    state,
    { payload: newMeeting },
) => {
    const newMeetingCalendarKey = getCalendarMeetingKey(newMeeting.startTime);
    state.calendarMeetings[newMeetingCalendarKey] =
        state.calendarMeetings[newMeetingCalendarKey] || [];
    state.calendarMeetings[newMeetingCalendarKey].push(newMeeting.id);
    state.meetings[newMeeting.id] = newMeeting;

    state.selectedDate = newMeeting.startTime;
};
