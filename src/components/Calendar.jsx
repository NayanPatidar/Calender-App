import React, { useContext, useState } from 'react';
import { EventContext } from '../context/EventContext';
import EventForm from './EventForm';
import EventModal from './EventModal';
import './Calendar.css'; 

const Calendar = () => {
  const { events, deleteEvent } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="calendar">
      <h1>React Calendar</h1>
      <EventForm />
      <div className="calendar-grid">
        {[...Array(30)].map((_, day) => (
          <div key={day} className="calendar-day">
            <h3>Day {day + 1}</h3>
            <ul>
              {events
                .filter((event) => new Date(event.date).getDate() === day + 1)
                .map((event) => (
                  <li key={event.id} onClick={() => handleEventClick(event)}>
                    {event.title}
                    <button onClick={() => deleteEvent(event.id)}>Delete</button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
