import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendar-planner-events-v2');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('calendar-planner-events-v2', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    const id = Date.now().toString();
    const newEvent = { ...event, id };

    setEvents(prev => ({
      ...prev,
      [event.startDate]: [...(prev[event.startDate] || []), newEvent]
    }));
  };

  const removeEvent = (startDate, eventId) => {
    setEvents(prev => ({
      ...prev,
      [startDate]: (prev[startDate] || []).filter(e => e.id !== eventId)
    }));
  };

  const updateEvent = (oldStartDate, eventId, updatedData) => {
    setEvents(prev => {
      const filteredOld = (prev[oldStartDate] || []).filter(e => e.id !== eventId);
      const newStartDate = updatedData.startDate;

      const updatedEvent = { ...updatedData, id: eventId };

      return {
        ...prev,
        [oldStartDate]: filteredOld,
        [newStartDate]: [...(prev[newStartDate] || []), updatedEvent]
      };
    });
  };

  const moveEvent = (date, fromIndex, toIndex) => {
    setEvents(prev => {
      const dayEvents = [...(prev[date] || [])];
      const [removed] = dayEvents.splice(fromIndex, 1);
      dayEvents.splice(toIndex, 0, removed);
      return { ...prev, [date]: dayEvents };
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent, updateEvent, moveEvent }}>
      {children}
    </EventContext.Provider>
  );
};
