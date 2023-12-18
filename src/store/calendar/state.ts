import { hardcoded } from '../../lib/hardcoded';
import { getCalendarMeetingKey } from '../../utils/dateUtils';

export const SLICE = 'calendar';

export interface Meeting {
    id: string;
    title: string;
    attendees: string;
    startTime: Date;
    duration: number;
    video: 'NONE' | 'ZOOM' | 'MEET';
}

export interface State {
    selectedDate: Date;
    // string key will be in the format provided by src/utils/dateUtils#getMeetingKey
    calendarMeetings: Record<string, string[]>;
    meetings: Record<string, Meeting>;
    meetingDetails: Meeting | undefined;
    showMeetingDetails: boolean;
}

export interface AppCalendarState {
    calendar: State;
}

export function getInitialState(): State {
    const today = new Date();
    return {
        selectedDate: today,
        meetingDetails: undefined,
        showMeetingDetails: false,
        ...getInitialMeetings(),
    };
}

function getInitialMeetings() {
    const initialMeetings = hardcoded.reduce<Pick<State, 'calendarMeetings' | 'meetings'>>(
        (acc, { output }) => {
            const meeting = parseMeeting(output);
            acc.meetings[meeting.id] = meeting;

            const calendarKey = getCalendarMeetingKey(meeting.startTime);
            if (!acc.calendarMeetings[calendarKey]) {
                acc.calendarMeetings[calendarKey] = [];
            }
            acc.calendarMeetings[calendarKey].push(meeting.id);

            return acc;
        },
        {
            calendarMeetings: {},
            meetings: {},
        },
    );

    return initialMeetings;
}

export function parseMeeting(input: (typeof hardcoded)[0]['output']): Meeting {
    // this can probably be better
    const meetingId = String(Math.random());
    const startTime = new Date(input.START_TIME);
    const meeting = {
        id: meetingId,
        title: input.TITLE,
        attendees: input.ATTENDEES,
        startTime,
        duration: input.DURATION,
        video: input.VIDEO as Meeting['video'],
    };

    return meeting;
}
