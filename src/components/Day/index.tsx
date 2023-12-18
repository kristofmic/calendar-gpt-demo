import { selectors as calendarSelectors } from '../../store/calendar';
import { MeetingPreview } from '../MeetingPreview';
import { Hour } from './Hour';
import { useMeetingIntersections } from './useMeetingIntersections';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const HOURS = [...new Array(24)].map((_, i) => i);

interface Props {
    onScrollTo: (x: number, y: number) => void;
}

export function Day({ onScrollTo }: Props) {
    const dayRef = useRef<HTMLDivElement>(null);
    const [intervalHeight, setIntervalHeight] = useState(0);
    const selectedDateMeetings = useSelector(calendarSelectors.getSelectedDateMeetings);
    const meetingIntersections = useMeetingIntersections(selectedDateMeetings);

    useLayoutEffect(() => {
        if (!dayRef.current) {
            return;
        }

        const { height } = dayRef.current.getBoundingClientRect();
        // To avoid dealing in partial pixels
        const intervalHeight = Math.floor(height / 24);
        setIntervalHeight(intervalHeight);

        const currentHour = new Date().getHours();
        onScrollTo(0, intervalHeight * currentHour);
    }, [onScrollTo]);

    return (
        <div className='relative' ref={dayRef}>
            <div className='relative flex flex-col flex-nowrap px-4 py-2'>
                <span className='absolute left-16 top-0 h-full w-px bg-neutral-500/[.30]' />
                {HOURS.map((hour) => (
                    <Hour key={hour} hour={hour} />
                ))}
            </div>
            <div className='absolute left-16 right-0 top-0 mr-6'>
                {selectedDateMeetings.map((meeting) => {
                    return (
                        <MeetingPreview
                            key={meeting.id}
                            intervalHeight={intervalHeight}
                            meeting={meeting}
                            meetingIntersections={meetingIntersections}
                        />
                    );
                })}
            </div>
        </div>
    );
}
