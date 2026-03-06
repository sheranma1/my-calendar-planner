import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import DayCell from './DayCell';
import EventModal from './EventModal';
import { useCalendar } from '../../hooks/useCalendar';
import { useEvents } from '../../context/EventContext';
import { format } from 'date-fns';
import './Calendar.css';

const Calendar = () => {
    const {
        currentDate,
        days,
        nextMonth,
        prevMonth,
        goToToday,
        formatMonth,
        isSameMonth,
        isSameDay
    } = useCalendar();

    const { addEvent, removeEvent, updateEvent } = useEvents();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    const handleDayClick = (day) => {
        setSelectedDate(day);
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleAddEventClick = () => {
        setSelectedDate(new Date());
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setSelectedDate(new Date(event.startDate));
        setIsModalOpen(true);
    };

    const handleSaveEvent = (eventData) => {
        if (selectedEvent) {
            updateEvent(selectedEvent.startDate, selectedEvent.id, eventData);
        } else {
            addEvent(eventData);
        }
    };

    const handleDeleteEvent = (startDate, eventId) => {
        removeEvent(startDate, eventId);
    };

    return (
        <div className="calendar-container glass-card animate-fade-in">
            <CalendarHeader
                currentDate={currentDate}
                onPrev={prevMonth}
                onNext={nextMonth}
                onToday={goToToday}
                formatMonth={formatMonth}
                onAddEvent={handleAddEventClick}
            />

            <div className="calendar-grid">
                {weekdays.map(day => (
                    <div key={day} className="weekday-header">{day}</div>
                ))}

                {days.map(day => (
                    <DayCell
                        key={day.toString()}
                        day={day}
                        isCurrentMonth={isSameMonth(day)}
                        isToday={isSameDay(day)}
                        onClick={handleDayClick}
                        onEventClick={handleEventClick}
                    />
                ))}
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                event={selectedEvent}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    );
};

export default Calendar;
