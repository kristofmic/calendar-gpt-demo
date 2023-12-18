import { MONTHS } from '../../utils/dateUtils';
import { IconButton } from '../Buttons/IconButton';

interface Props {
    date: Date;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
}

export function MonthPicker({ date, onPreviousMonth, onNextMonth }: Props) {
    return (
        <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold text-neutral-800'>{`${
                MONTHS[date.getMonth()]
            } ${date.getFullYear()}`}</p>
            <div className='flex gap-x-1'>
                <IconButton
                    className='!h-5 !w-5'
                    iconType='ChevronLeft'
                    iconClassName='!h-3 !w-3'
                    onClick={onPreviousMonth}
                />
                <IconButton
                    className='!h-5 !w-5'
                    iconType='ChevronRight'
                    iconClassName='!h-3 !w-3'
                    onClick={onNextMonth}
                />
            </div>
        </div>
    );
}
