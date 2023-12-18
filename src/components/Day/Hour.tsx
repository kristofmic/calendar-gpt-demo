import { format12Hour } from '../../utils/dateUtils';
import React from 'react';

interface Props {
    hour: number;
}

export function Hour({ hour }: Props) {
    return (
        <div className='relative h-12' key={hour}>
            <div className='absolute -top-2 flex w-full items-center gap-2'>
                <p className='w-8 text-right text-2xs font-medium text-neutral-600'>
                    {format12Hour(hour, true)}
                </p>
                <span className='h-px grow bg-neutral-500/[.30]' />
            </div>
            {hour === 23 && (
                <div className='absolute bottom-0 left-10 right-0 h-px bg-neutral-500/[.30]' />
            )}
        </div>
    );
}
