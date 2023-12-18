import cx from 'classnames';
import { useCallback, type ChangeEventHandler } from 'react';

interface Props {
    autoFocus?: boolean;
    className?: string;
    field: string;
    onChange: (data: { field: string; value: number | string | undefined }) => void;
    placeholder: string;
    value: number | string | undefined;
}

export function TextInput({ autoFocus, className, field, onChange, placeholder, value }: Props) {
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
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
        <input
            autoFocus={autoFocus}
            className={cx(
                'border-b border-neutral-500/[.3] bg-neutral-50 p-2 outline-none focus:border-amber-500 active:border-amber-500',
                className,
            )}
            type='text'
            onChange={handleChange}
            placeholder={placeholder}
            value={value}
        />
    );
}
