import { ChevronRightIcon, ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import cx from 'classnames';
import React from 'react';

export type IconType = 'ChevronRight' | 'ChevronLeft' | 'XMarkIcon';

interface Props {
    className?: string;
    disabled?: boolean;
    onClick: (event: React.MouseEvent) => void;
    iconClassName?: string;
    iconType: IconType;
}

export function IconButton({ className, disabled, onClick, iconClassName, iconType }: Props) {
    let Icon: React.ComponentType<{ className?: string; children?: React.ReactNode | undefined }> =
        React.Fragment;
    switch (iconType) {
        case 'ChevronLeft':
            Icon = ChevronLeftIcon;
            break;
        case 'ChevronRight':
            Icon = ChevronRightIcon;
            break;
        case 'XMarkIcon':
            Icon = XMarkIcon;
            break;
        default:
            console.error(`Unknown "iconType" prop provided to IconButton: ${iconType}`);
    }

    return (
        <button
            className={cx(
                'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-neutral-500/[.30] bg-white outline-none transition-colors hover:bg-neutral-100',
                {
                    'bg-neutral-100 opacity-60': disabled,
                },
                className,
            )}
            disabled={disabled}
            onClick={onClick}
            type='button'
        >
            <Icon className={cx('h-5 w-5 text-neutral-600', iconClassName)} />
        </button>
    );
}
