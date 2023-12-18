import { useCallback, useState } from 'react';

export function useToggleNewMeeting() {
    const [showNewMeeting, toggleCreateMeeting] = useState(false);
    const onCreateNewMeeting = useCallback(() => {
        toggleCreateMeeting(true);
    }, []);
    const onDismissNewMeeting = useCallback(() => {
        toggleCreateMeeting(false);
    }, []);

    return {
        showNewMeeting,
        onCreateNewMeeting,
        onDismissNewMeeting,
    };
}
