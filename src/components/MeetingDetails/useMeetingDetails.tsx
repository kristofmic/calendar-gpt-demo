import type { Meeting } from '../../store/calendar/state';
import { useCallback, useReducer } from 'react';

interface SetFieldValue {
    payload: {
        field: keyof Meeting;
        value: Meeting[keyof Meeting];
    };
    type: 'SET_FIELD_VALUE';
}

function meetingDetailsReducer(state: Partial<Meeting> = {}, action: SetFieldValue) {
    switch (action.type) {
        case 'SET_FIELD_VALUE': {
            const { field, value } = action.payload;
            return {
                ...state,
                [field]: value,
            };
        }
        default:
            return state;
    }
}

export function useMeetingDetails(initialState: Partial<Meeting> = {}) {
    const [state, dispatch] = useReducer<typeof meetingDetailsReducer>(
        meetingDetailsReducer,
        initialState,
    );

    const setFieldValue = useCallback((payload: SetFieldValue['payload']) => {
        dispatch({
            payload,
            type: 'SET_FIELD_VALUE',
        });
    }, []);

    return {
        state,
        setFieldValue,
    };
}
