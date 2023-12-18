import { getCalendarMeetingKey } from '../../utils/dateUtils';
import { SLICE } from './state';
import type { AppCalendarState } from './state';

export const getSlice = (state: AppCalendarState) => state[SLICE];

export const getSelectedDate = (state: AppCalendarState) => getSlice(state).selectedDate;

export const getCalendarMeetings = (state: AppCalendarState) => getSlice(state).calendarMeetings;

export const getMeetings = (state: AppCalendarState) => getSlice(state).meetings;

export const getSelectedDateMeetings = (state: AppCalendarState) => {
    const key = getCalendarMeetingKey(getSelectedDate(state));
    const meetingIds = getCalendarMeetings(state)[key] || [];
    const meetings = getMeetings(state);
    return meetingIds.map((id) => meetings[id]);
};

export const getShowMeetingDetails = (state: AppCalendarState) =>
    getSlice(state).showMeetingDetails;

export const getMeetingDetails = (state: AppCalendarState) => getSlice(state).meetingDetails;
