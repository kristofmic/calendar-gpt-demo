import {
    DAYS,
    getFirstDayOfMonth,
    getDaysInMonth,
    getPreviousMonth,
    getNextMonth,
    getLastDayOfMonth,
} from '../../utils/dateUtils';
import { CalendarDay, CalendarGridDay } from './CalendarGridDay';
import { useMemo } from 'react';

interface Props {
    date: Date;
    onSelectDate: (date: Date) => void;
    selectedDate?: Date;
}

export function CalendarGrid({ date: calendarDate, onSelectDate, selectedDate }: Props) {
    const calendarDays = useMemo(() => {
        const daysInMonth = getDaysInMonth(calendarDate);
        let days = [...new Array(daysInMonth)].map((_, i) => {
            const day = new Date(calendarDate);
            day.setDate(i + 1);
            return getCalendarDay(day, calendarDate, selectedDate);
        });

        const firstDayOfMonth = getFirstDayOfMonth(calendarDate);
        if (firstDayOfMonth !== 0) {
            const previousMonth = getPreviousMonth(calendarDate);
            const daysInPreviousMonth = getDaysInMonth(previousMonth);
            const start = daysInPreviousMonth - firstDayOfMonth + 1;
            const startDays = [];
            for (let i = start; i <= daysInPreviousMonth; i++) {
                const day = new Date(previousMonth);
                day.setDate(i);
                startDays.push(getCalendarDay(day, calendarDate, selectedDate));
            }
            days = startDays.concat(days);
        }

        const lastDayOfMonth = getLastDayOfMonth(calendarDate);
        if (lastDayOfMonth !== 6) {
            const nextMonth = getNextMonth(calendarDate);
            const end = DAYS.length - lastDayOfMonth;
            for (let i = 1; i < end; i++) {
                const day = new Date(nextMonth);
                day.setDate(i);
                days.push(getCalendarDay(day, calendarDate, selectedDate));
            }
        }

        return days;
    }, [calendarDate, selectedDate]);

    return (
        <div className='grid grid-cols-7 gap-x-1 gap-y-1'>
            {DAYS.map((day) => (
                <span className='text-center text-2xs uppercase text-neutral-600' key={day}>
                    {day.slice(0, 1)}
                </span>
            ))}
            {calendarDays.map((day) => (
                <CalendarGridDay key={`${day.date.getTime()}`} day={day} onClick={onSelectDate} />
            ))}
        </div>
    );
}

function getCalendarDay(date: Date, calendarDate: Date, selectedDate?: Date): CalendarDay {
    const today = new Date();

    return {
        date,
        isCurrentMonth: date.getMonth() === calendarDate.getMonth(),
        isToday:
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear() &&
            date.getDate() === today.getDate(),
        isSelected: selectedDate
            ? date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear() &&
              date.getDate() === selectedDate.getDate()
            : false,
    };
}
