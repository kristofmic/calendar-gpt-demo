import '../../lib/gpt';
import { selectors as calendarSelectors } from '../../store/calendar';
import { Day } from '../Day';
import { LeftNav } from '../LeftNav';
import { MeetingDetails } from '../MeetingDetails';
import { NewMeeting } from '../NewMeeting';
import { useToggleNewMeeting } from '../NewMeeting/useToggleNewMeeting';
import { TopNav } from '../TopNav';
import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';

export function AppBody() {
    const dayContainerRef = useRef<HTMLDivElement>(null);
    const handleScrollToHour = useCallback((x: number, y: number) => {
        dayContainerRef.current?.scrollTo(x, y);
    }, []);

    const showMeetingDetails = useSelector(calendarSelectors.getShowMeetingDetails);

    const { showNewMeeting, onCreateNewMeeting, onDismissNewMeeting } = useToggleNewMeeting();

    return (
        <div className='AppBody'>
            <TopNav />
            <div className='fixed bottom-0 left-0 right-0 top-16 overflow-hidden'>
                <LeftNav onCreateMeeting={onCreateNewMeeting} />
            </div>
            <div
                className='fixed bottom-0 left-64 right-0 top-0 overflow-scroll pt-16'
                ref={dayContainerRef}
            >
                {/* TODO - build out week, month, year views */}
                <Day onScrollTo={handleScrollToHour} />
            </div>
            {/* TODO - add routing to support deep linking, general browser controls, and reduce the need for individual route management */}
            {showMeetingDetails && <MeetingDetails />}
            {showNewMeeting && <NewMeeting onDismiss={onDismissNewMeeting} />}
        </div>
    );
}
