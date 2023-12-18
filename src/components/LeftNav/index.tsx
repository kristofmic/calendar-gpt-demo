import { actions as calendarActions, selectors as calendarSelectors } from '../../store/calendar';
import { OutlineButton } from '../Buttons/OutlineButton';
import { Calendar } from '../Calendar';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    onCreateMeeting: () => void;
}

export function LeftNav({ onCreateMeeting }: Props) {
    const selectedDate = useSelector(calendarSelectors.getSelectedDate);
    const dispatch = useDispatch();
    const handleSelectDate = useCallback(
        (date: Date) => {
            dispatch(calendarActions.setSelectedDate(date));
        },
        [dispatch],
    );

    return (
        <div className='left-0 top-0 flex h-full w-64 flex-col gap-8 bg-white p-4'>
            <span>
                <OutlineButton label='Create Meeting' onClick={onCreateMeeting} />
            </span>

            {/* TODO - add highlights on the calendar when meetings are scheduled for that day */}
            <Calendar
                initialDate={selectedDate}
                onSelectDate={handleSelectDate}
                selectedDate={selectedDate}
            />
        </div>
    );
}
