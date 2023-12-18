import cx from 'classnames';
import { useCallback } from 'react';

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
}

interface Props {
    day: CalendarDay;
    onClick: (date: Date) => void;
}

export function CalendarGridDay({ day, onClick }: Props) {
    const handleSelectDate = useCallback(() => {
        onClick(day.date);
    }, [onClick, day]);

    return (
        <button
            className={cx(
                'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-2xs outline-none transition-colors hover:bg-neutral-100',
                {
                    'font-semibold text-neutral-800': day.isCurrentMonth,
                    'text-neutral-600': !day.isCurrentMonth,
                    '!hover:bg-amber-200 !bg-amber-100 !text-amber-600':
                        day.isSelected && !day.isToday,
                    '!hover:bg-amber-500 !bg-amber-500 !text-neutral-800': day.isToday,
                },
            )}
            onClick={handleSelectDate}
            type='button'
        >
            {day.date.getDate()}
        </button>
    );
}
