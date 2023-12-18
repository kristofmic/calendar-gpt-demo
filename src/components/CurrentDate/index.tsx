import { selectors as calendarSelectors } from '../../store/calendar';
import { DAYS, MONTHS } from '../../utils/dateUtils';
import React from 'react';
import { useSelector } from 'react-redux';

export function CurrentDate() {
    const date = useSelector(calendarSelectors.getSelectedDate);

    return (
        <div className='flex flex-col items-start'>
            <p className='text-xs uppercase text-neutral-600'>{DAYS[date.getDay()]}</p>
            <p className='text-xl font-semibold text-neutral-800'>{`${
                MONTHS[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`}</p>
        </div>
    );
}
