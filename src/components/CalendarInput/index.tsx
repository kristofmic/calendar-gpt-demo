import { Calendar } from '../Calendar';
import React, { ChangeEventHandler, useCallback, useMemo } from 'react';

const START_TIME_VALUES: Array<{ label: string; value: number }> = [...new Array(24 * 4)].reduce(
    (acc, _, i) => {
        const time = i * 0.25;
        let hour;
        if (i < 4) {
            hour = `12:${time * 60}`.padEnd(5, '0') + 'am';
        } else if (i < 12 * 4) {
            const _hour = Math.floor(i / 4);
            const _minutes = (time - _hour) * 60;
            hour = `${_hour}:${_minutes}`.padEnd(_hour < 10 ? 4 : 5, '0') + 'am';
        } else {
            const _hour = Math.floor(i / 4);
            const _minutes = (time - _hour) * 60;

            if (_hour === 12) {
                hour = `12:${_minutes}`.padEnd(5, '0') + 'pm';
            } else {
                hour = `${_hour - 12}:${_minutes}`.padEnd(_hour - 12 < 10 ? 4 : 5, '0') + 'pm';
            }
        }

        const timeOption = {
            label: hour,
            value: time,
        };

        acc.push(timeOption);
        return acc;
    },
    [],
);

interface Props {
    field: string;
    label: string;
    onChange: (data: { field: string; value: Date }) => void;
    value: Date;
}

export function CalendarInput({ field, label, onChange, value }: Props) {
    const startTime = useMemo(() => {
        const hour = value.getHours();
        const minutes = value.getMinutes();

        return hour + minutes / 60;
    }, [value]);

    const handleSelectDate = useCallback(
        (date: Date) => {
            const hour = Math.floor(startTime);
            const minutes = (startTime - hour) * 60;

            date.setHours(hour);
            date.setMinutes(minutes);

            onChange({
                field,
                value: date,
            });
        },
        [onChange, field, startTime],
    );
    const handleSelectTime = useCallback<ChangeEventHandler<HTMLSelectElement>>(
        (event) => {
            const { value: _time } = event.currentTarget;
            const time = parseFloat(_time);
            const hour = Math.floor(time);
            const minutes = (time - hour) * 60;
            const nextStartTime = new Date(value!);
            nextStartTime?.setHours(hour);
            nextStartTime?.setMinutes(minutes);

            onChange({
                field,
                value: nextStartTime,
            });
        },
        [onChange, field, value],
    );

    return (
        <>
            <label className='px-2 text-sm font-semibold text-neutral-600'>{label}</label>
            <br />
            <Calendar initialDate={value} onSelectDate={handleSelectDate} selectedDate={value} />
            <select
                className='border-b border-neutral-500/[.3] bg-neutral-50 p-2 outline-none focus:border-amber-500 active:border-amber-500'
                name={field}
                id={field}
                onChange={handleSelectTime}
                value={startTime}
            >
                {START_TIME_VALUES.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </>
    );
}
