import cx from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

interface Props {
    className?: string;
    disabled?: boolean;
    onClick: (event: React.MouseEvent) => void;
    label: string;
    type?: ButtonHTMLAttributes<any>['type'];
}

export function OutlineButton({ className, disabled, onClick, label, type = 'button' }: Props) {
    return (
        <button
            className={cx(
                'text-neutral flex h-fit cursor-pointer items-center justify-center rounded border border-neutral-500/[.30] bg-white px-6 py-2 text-sm font-semibold outline-none transition-colors hover:bg-neutral-100',
                {
                    'bg-neutral-100 opacity-60': disabled,
                },
                className,
            )}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    );
}
