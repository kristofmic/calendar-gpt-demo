import { CalendarGrid } from './CalendarGrid';
import { MonthPicker } from './MonthPicker';
import { useCallback, useEffect, useState } from 'react';

interface Props {
    initialDate: Date;
    onSelectDate: (date: Date) => void;
    selectedDate?: Date;
}

export function Calendar({ initialDate, onSelectDate, selectedDate }: Props) {
    const [calendarDate, setCalendarDate] = useState(initialDate);
    const handleNextMonth = useCallback(() => {
        setCalendarDate((date) => {
            const nextMonth = new Date(date);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return nextMonth;
        });
    }, []);
    const handlePreviousMonth = useCallback(() => {
        setCalendarDate((date) => {
            const prevMonth = new Date(date);
            prevMonth.setMonth(prevMonth.getMonth() - 1);
            return prevMonth;
        });
    }, []);

    useEffect(() => {
        if (selectedDate) {
            setCalendarDate(selectedDate);
        }
    }, [selectedDate]);

    return (
        <div className='flex flex-col gap-y-2 '>
            <MonthPicker
                date={calendarDate}
                onNextMonth={handleNextMonth}
                onPreviousMonth={handlePreviousMonth}
            />
            <CalendarGrid
                date={calendarDate}
                onSelectDate={onSelectDate}
                selectedDate={selectedDate}
            />
        </div>
    );
}
