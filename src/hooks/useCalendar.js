import { useState, useMemo } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay
} from 'date-fns';

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const days = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentDate));
        const end = endOfWeek(endOfMonth(currentDate));
        return eachDayOfInterval({ start, end });
    }, [currentDate]);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToToday = () => setCurrentDate(new Date());

    return {
        currentDate,
        days,
        nextMonth,
        prevMonth,
        goToToday,
        formatMonth: (date) => format(date, 'MMMM yyyy'),
        isSameMonth: (date) => isSameMonth(date, currentDate),
        isSameDay: (date) => isSameDay(date, new Date()),
    };
};
