// TODO - leverage a more robust date+time library to better abstract these kinds of utilities in a more robust way
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function getDateFormat(d: Date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    } as const;

    return d.toLocaleDateString(undefined, options);
}

export function getWeekday(d: Date) {
    const options = {
        weekday: 'long',
    } as const;

    return d.toLocaleDateString(undefined, options);
}

export function getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getPreviousMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function getNextMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function getLastDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
}

export function getCalendarMeetingKey(date: Date) {
    return date.toLocaleString().split(',')[0];
}

export function format12Hour(hour: number, withAmPm?: boolean) {
    if (hour === 0) {
        return '';
    }

    if (hour < 12) {
        return `${hour}${withAmPm ? ' AM' : ''}`;
    }

    if (hour === 12) {
        return `${hour}${withAmPm ? ' PM' : ''}`;
    }

    return `${hour % 12}${withAmPm ? ' PM' : ''}`;
}
