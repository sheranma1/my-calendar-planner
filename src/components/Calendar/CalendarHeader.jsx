import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';

const CalendarHeader = ({ currentDate, onPrev, onNext, onToday, formatMonth, onAddEvent }) => {
    return (
        <div className="calendar-header">
            <div className="header-left">
                <div className="icon-wrapper">
                    <CalendarIcon size={24} className="primary-text" />
                </div>
                <h1>{formatMonth(currentDate)}</h1>
            </div>

            <div className="header-right">
                <div className="nav-controls">
                    <button className="btn-icon" onClick={onPrev} title="Previous Month">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="btn-today" onClick={onToday}>Today</button>
                    <button className="btn-icon" onClick={onNext} title="Next Month">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <button className="btn-primary" onClick={onAddEvent}>
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    Add Event
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;
