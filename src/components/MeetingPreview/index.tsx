import { actions as calendarActions } from '../../store/calendar';
import { Meeting } from '../../store/calendar/state';
import { useMeetingPreviewStaticStyle } from './useMeetingPreviewStaticStyle';
import cx from 'classnames';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    intervalHeight: number;
    meeting: Meeting;
    meetingIntersections: Record<string, Set<string>>;
}

export function MeetingPreview({ intervalHeight, meeting, meetingIntersections }: Props) {
    const staticStyle = useMeetingPreviewStaticStyle({
        intervalHeight,
        meeting,
        meetingIntersections,
    });
    const dispatch = useDispatch();
    const handleClick = useCallback(() => {
        dispatch(calendarActions.showMeetingDetails(meeting));
    }, [dispatch, meeting]);

    return (
        <div
            className='absolute left-0 flex !min-h-fit w-full cursor-pointer flex-col overflow-hidden rounded bg-amber-500 px-2 text-start border-white border'
            onClick={handleClick}
            style={staticStyle}
        >
            <p
                className={cx('pt-1 text-xs font-semibold text-neutral-800', {
                    '!pt-0 !text-2xs': meeting.duration <= 15,
                })}
            >
                {meeting.title}
                {meeting.video !== 'NONE' && (
                    <span className='ml-1 font-normal'>{`(${meeting.video})`}</span>
                )}
                {meeting.duration <= 30 && (
                    <span className='ml-1 font-normal'>{meeting.attendees}</span>
                )}
            </p>
            {meeting.duration > 30 && (
                <p className='text-xs text-neutral-800'>{meeting.attendees}</p>
            )}
        </div>
    );
}
