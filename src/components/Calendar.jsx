import React, { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import EventForm from "./EventForm";
import EventModal from "./EventModal";
import "./Calendar.css";

const Calendar = () => {
  const { events, deleteEvent } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("All");

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const filterEventsByCategory = (category) => {
    if (category === "All") return events;
    return events.filter((event) => event.category === category);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredEvents = filterEventsByCategory(category);

  return (
    <div className="calendar">
      <h1>React Calendar</h1>
      <EventForm />
      <div className="event-form">
        <label htmlFor="category-select">Filter by Category: </label>
        <select id="category-select" onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className="calendar-grid">
        {[...Array(30)].map((_, day) => (
          <div key={day} className="calendar-day">
            <h3>Day {day + 1}</h3>
            <ul>
              {filteredEvents
                .filter((event) => new Date(event.date).getDate() === day + 1)
                .map((event) => (
                  <li key={event.id} style={{ fontWeight: "bold" }}>
                    <span
                      style={{
                        backgroundColor: "#F4F3F3",
                        padding: "5px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      {event.title}
                    </span>
                    <button onClick={() => deleteEvent(event.id)}>
                      Delete
                    </button>
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
