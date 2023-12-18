import { Meeting } from '../../store/calendar/state';
import { useMemo } from 'react';

export function useMeetingIntersections(meetings: Meeting[]) {
    const meetingIntersections = useMemo(() => {
        const meetingTimes = meetings
            .flatMap((item) => {
                return [
                    {
                        id: item.id,
                        time: item.startTime.valueOf(),
                        type: 'start',
                    },
                    {
                        id: item.id,
                        time: item.startTime.valueOf() + item.duration * 60 * 1000,
                        type: 'end',
                    },
                ];
            })
            .sort((a, b) => a.time - b.time);

        const overlaps = meetingTimes.reduce<Record<string, Set<string>>>((acc, time, i) => {
            if (!acc[time.id]) {
                acc[time.id] = new Set();
            }

            if (i === 0) {
                return acc;
            }

            const prevTime = meetingTimes[i - 1];
            if (
                (time.id === prevTime.id && time.type) ||
                (time.type === 'start' && prevTime.type === 'end')
            ) {
                return acc;
            }

            acc[prevTime.id].add(time.id);
            acc[time.id].add(prevTime.id);

            return acc;
        }, {});

        return overlaps;
    }, [meetings]);

    return meetingIntersections;
}
