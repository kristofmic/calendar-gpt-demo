import { useOnEscape } from '../../hooks/useOnEscape';
import { selectors as calendarSelectors, actions as calendarActions } from '../../store/calendar';
import type { Meeting } from '../../store/calendar/state';
import { IconButton } from '../Buttons/IconButton';
import { OutlineButton } from '../Buttons/OutlineButton';
import { CalendarInput } from '../CalendarInput';
import { SelectInput } from '../SelectInput';
import { TextInput } from '../TextInput';
import { useMeetingDetails } from './useMeetingDetails';
import {
    ChatBubbleBottomCenterTextIcon,
    UserGroupIcon,
    ClockIcon,
    VideoCameraIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import React, { FormEventHandler, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const VIDEO_OPTIONS = [
    { label: 'None', value: 'NONE' },
    { label: 'Meet', value: 'MEET' },
    { label: 'Zoom', value: 'ZOOM' },
];
const DURATION_OPTIONS = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '1 hour', value: 60 },
    { label: '1 hour 15 min', value: 75 },
    { label: '1 1/2 hours', value: 90 },
    { label: '1 hour 45 min', value: 105 },
    { label: '2 hours', value: 120 },
    { label: '2 hours 15 min', value: 135 },
    { label: '2 1/2 hours', value: 150 },
    { label: '2 hours 45 min', value: 165 },
    { label: '3 hours', value: 180 },
    { label: '3 hours 15 min', value: 195 },
    { label: '3 1/2 hours', value: 210 },
    { label: '3 hours 45 min', value: 225 },
    { label: '4 hours', value: 240 },
    { label: '4 hours 15 min', value: 255 },
    { label: '4 1/2 hours', value: 270 },
    { label: '4 hours 45 min', value: 285 },
];

type InputChangeHandler = (data: {
    field: string;
    value: number | string | undefined | Date;
}) => void;

export function MeetingDetails() {
    const meeting = useSelector(calendarSelectors.getMeetingDetails);
    const { state: meetingState, setFieldValue } = useMeetingDetails(meeting);
    const handleInputChange = useCallback<InputChangeHandler>(
        ({ field, value }) => {
            setFieldValue({
                field: field as keyof Meeting,
                value: value as Meeting[keyof Meeting],
            });
        },
        [setFieldValue],
    );

    const dispatch = useDispatch();
    const handleDismiss = useCallback(() => {
        dispatch(calendarActions.dismissMeetingDetails());
    }, [dispatch]);
    const handleSave = useCallback<FormEventHandler>(
        (event) => {
            event.preventDefault();

            dispatch(
                calendarActions.updateMeeting({
                    ...meeting,
                    ...meetingState,
                } as Meeting),
            );
        },
        [dispatch, meetingState, meeting],
    );

    useOnEscape(handleDismiss);

    return (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-20 overflow-scroll rounded bg-white p-8'>
            <IconButton className='absolute right-4' iconType='XMarkIcon' onClick={handleDismiss} />
            <h1 className='text-neutral mb-8 ml-1 mt-px text-xl font-semibold'>Meeting Details</h1>
            <form className='flex w-3/5 flex-col gap-4 pr-12 pt-1' onSubmit={handleSave}>
                <div className='flex w-full flex-row items-center gap-4'>
                    <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-neutral-600' />
                    <TextInput
                        autoFocus
                        className='flex-grow'
                        field='title'
                        onChange={handleInputChange}
                        placeholder='Meeting title'
                        value={meetingState.title}
                    />
                </div>

                <div className='flex w-full flex-row items-center gap-4'>
                    <UserGroupIcon className='h-5 w-5 text-neutral-600' />
                    <TextInput
                        className='flex-grow'
                        field='attendees'
                        onChange={handleInputChange}
                        placeholder='Meeting attendees'
                        value={meetingState.attendees}
                    />
                </div>

                <div className='flex w-full flex-row items-center gap-4'>
                    <CalendarDaysIcon className='h-5 w-5 text-neutral-600' />
                    <CalendarInput
                        field='startTime'
                        label='Start time:'
                        onChange={handleInputChange}
                        value={meetingState.startTime!}
                    />
                </div>

                <div className='flex w-full flex-row items-center gap-4'>
                    <ClockIcon className='h-5 w-5 text-neutral-600' />
                    <SelectInput
                        field='duration'
                        label='Duration (min):'
                        // TODO - handle wider variety of durations
                        values={DURATION_OPTIONS}
                        onChange={handleInputChange}
                        value={meetingState.duration}
                    />
                </div>

                <div className='flex w-full flex-row items-center gap-4'>
                    <VideoCameraIcon className='h-5 w-5 text-neutral-600' />
                    <SelectInput
                        field='video'
                        label='Video option:'
                        values={VIDEO_OPTIONS}
                        onChange={handleInputChange}
                        value={meetingState.video}
                    />
                </div>
                <span>
                    <OutlineButton label='Save' onClick={handleSave} type='submit' />
                </span>
            </form>
        </div>
    );
}
