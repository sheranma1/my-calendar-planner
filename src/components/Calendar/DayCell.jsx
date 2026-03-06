import React from 'react';
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import { useEvents } from '../../context/EventContext';

const DayCell = ({ day, isCurrentMonth, isToday, onClick, onEventClick }) => {
    const { events, moveEvent } = useEvents();
    const dateKey = format(day, 'yyyy-MM-dd');

    // Find events that occur on this day (either starting here or spanning across)
    const dayEvents = Object.values(events).flat().filter(event => {
        const start = startOfDay(parseISO(event.startDate));
        const end = endOfDay(parseISO(event.endDate || event.startDate));
        return isWithinInterval(day, { start, end });
    });

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('sourceIndex', index);
        e.dataTransfer.setData('sourceDate', dateKey);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));
        const sourceDate = e.dataTransfer.getData('sourceDate');

        if (sourceDate === dateKey && sourceIndex !== targetIndex) {
            moveEvent(dateKey, sourceIndex, targetIndex);
        }
        e.currentTarget.classList.remove('drag-over');
    };

    return (
        <div
            className={`day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
            onClick={() => onClick(day)}
        >
            <div className="day-number">{format(day, 'd')}</div>
            <div className="event-list">
                {dayEvents.map((event, index) => (
                    <div
                        key={event.id}
                        className="event-bar"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        style={{
                            backgroundColor: event.color || 'var(--primary)',
                            opacity: format(day, 'yyyy-MM-dd') === event.startDate ? 1 : 0.7,
                            cursor: 'grab'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                        }}
                        title={`${event.title}${event.category ? ` (${event.category})` : ''}`}
                    >
                        {format(day, 'yyyy-MM-dd') === event.startDate && (
                            <span className="event-title">{event.title}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayCell;
