import cx from 'classnames';
import React, { ChangeEventHandler, useCallback } from 'react';

interface Props {
    className?: string;
    field: string;
    onChange: (data: { field: string; value: string | undefined }) => void;
    label: string;
    value: number | string | undefined;
    values: Array<{
        label: string;
        value: string | number;
    }>;
}

export function SelectInput({ className, field, onChange, label, value, values }: Props) {
    const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
        (event) => {
            const { value } = event.currentTarget;

            onChange({
                field,
                value,
            });
        },
        [field, onChange],
    );

    return (
        <>
            <label
                className='cursor-pointer px-2 text-sm font-semibold text-neutral-600'
                htmlFor={field}
            >
                {label}
            </label>
            <select
                className={cx(
                    'border-b border-neutral-500/[.3] bg-neutral-50 p-2 outline-none focus:border-amber-500 active:border-amber-500',
                    className,
                )}
                name={field}
                id={field}
                onChange={handleChange}
                value={value}
            >
                {values.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </>
    );
}
