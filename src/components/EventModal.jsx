import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import './EventModal.css'; 

const EventModal = ({ event, onClose }) => {
  const { editEvent } = useContext(EventContext);
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [category, setCategory] = useState(event.category);

  const handleEdit = (e) => {
    e.preventDefault();
    editEvent({ ...event, title, date, category });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Event</h2>
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
