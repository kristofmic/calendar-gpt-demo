import { useOnEscape } from '../../hooks/useOnEscape';
import { askModelForDslMeeting } from '../../lib/gpt';
import { actions as calendarActions } from '../../store/calendar';
import { parseMeeting } from '../../store/calendar/state';
import { IconButton } from '../Buttons/IconButton';
import { OutlineButton } from '../Buttons/OutlineButton';
import React, { FormEventHandler, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    onDismiss: () => void;
}

export function NewMeeting({ onDismiss }: Props) {
    const [saving, setSaving] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useDispatch();

    const handleSave = useCallback<FormEventHandler>(
        async (event) => {
            event.preventDefault();
            const { value } = textAreaRef.current!;
            if (!value || !value.trim()) {
                return alert('Please provide a meeting prompt');
            }

            setSaving(true);
            const dslOutput = await askModelForDslMeeting(value, 'Me');
            dispatch(calendarActions.saveNewMeeting(parseMeeting(dslOutput)));
            setSaving(false);
            onDismiss();
        },
        [dispatch, onDismiss],
    );

    const handleDismiss = useCallback(() => {
        if (saving) {
            return;
        }

        onDismiss();
    }, [onDismiss, saving]);
    useOnEscape(handleDismiss);

    return (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-20 overflow-scroll rounded bg-white p-8'>
            <IconButton
                className='absolute right-4'
                disabled={saving}
                iconType='XMarkIcon'
                onClick={handleDismiss}
            />
            <h1 className='text-neutral mb-8 ml-1 mt-px text-xl font-semibold'>
                Create New Meeting
            </h1>

            <form className='flex w-3/5 flex-col gap-4 pr-12 pt-1' onSubmit={handleSave}>
                <textarea
                    autoFocus
                    className='h-40 w-full border border-neutral-500/[.3] bg-neutral-50 p-2 outline-none focus:border-amber-500 active:border-amber-500'
                    disabled={saving}
                    placeholder='Describe the meeting you want to schedule...'
                    ref={textAreaRef}
                />
                <span>
                    <OutlineButton
                        disabled={saving}
                        label={saving ? 'Saving...' : 'Save'}
                        onClick={handleSave}
                        type='submit'
                    />
                </span>
            </form>
        </div>
    );
}
