import { actions as calendarActions } from '../../store/calendar';
import { IconButton } from '../Buttons/IconButton';
import { OutlineButton } from '../Buttons/OutlineButton';
import { CurrentDate } from '../CurrentDate';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function TopNav() {
    const dispatch = useDispatch();
    const handleToday = useCallback(() => {
        dispatch(calendarActions.today());
    }, [dispatch]);
    const handleTomorrow = useCallback(() => {
        dispatch(calendarActions.nextDate());
    }, [dispatch]);
    const handleYesterday = useCallback(() => {
        dispatch(calendarActions.previousDate());
    }, [dispatch]);

    return (
        <div className='fixed left-0 top-0 z-10 flex h-16 w-full items-center gap-x-8 bg-white px-4 py-1'>
            <h1 className='w-56 text-left text-2xl font-bold tracking-widest'>
                Calendar<i className='font-normal tracking-normal'> GPT</i>
            </h1>
            <OutlineButton onClick={handleToday} label='Today' />
            <div className='flex gap-x-1'>
                <IconButton iconType='ChevronLeft' onClick={handleYesterday} />
                <IconButton iconType='ChevronRight' onClick={handleTomorrow} />
            </div>
            <CurrentDate />
        </div>
    );
}
