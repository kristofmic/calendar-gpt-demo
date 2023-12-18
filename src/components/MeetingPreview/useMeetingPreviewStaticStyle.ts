import { selectors as calendarSelectors } from '../../store/calendar';
import { Meeting } from '../../store/calendar/state';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// The hours component has py-2 which translates roughly to 8px
// Making this 7 to account for the 1px height of the border line
const PADDING_TOP_OFFSET = 7;

interface Props {
    intervalHeight: number;
    meeting: Meeting;
    meetingIntersections: Record<string, Set<string>>;
}

export function useMeetingPreviewStaticStyle({
    intervalHeight,
    meeting,
    meetingIntersections,
}: Props) {
    const intersections = meetingIntersections[meeting.id];
    const meetings = useSelector(calendarSelectors.getMeetings);

    return useMemo(() => {
        let meetingIntersectionDetails = [];
        let meetingIndex;
        let meetingLeftOffset = 0;
        let meetingSize = 1;
        if (intersections.size > 0) {
            intersections.forEach((id) => {
                meetingIntersectionDetails.push(meetings[id]);
            });
            meetingIntersectionDetails.push(meeting);
            meetingIntersectionDetails.sort((a, b) => {
                const timeDelta = a.startTime.valueOf() - b.startTime.valueOf();
                if (timeDelta !== 0) {
                    return timeDelta;
                }
                const durationDelta = b.duration - a.duration;
                if (durationDelta !== 0) {
                    return durationDelta;
                }

                return parseFloat(a.id) - parseFloat(b.id);
            });
            meetingIndex = meetingIntersectionDetails.findIndex((m) => m.id === meeting.id);
            meetingSize = meetingSize / meetingIntersectionDetails.length;
            meetingLeftOffset = meetingIndex * meetingSize;
        }

        return {
            height: Math.max((meeting.duration / 60) * intervalHeight, 14),
            top:
                intervalHeight *
                    (meeting.startTime.getHours() + meeting.startTime.getMinutes() / 60) +
                PADDING_TOP_OFFSET,
            left: meetingLeftOffset !== 0 ? `${Math.floor(meetingLeftOffset * 100)}%` : undefined,
            width: meetingSize !== 1 ? `${Math.floor(meetingSize * 100)}%` : undefined,
        };
    }, [intervalHeight, intersections, meetings, meeting]);
}
