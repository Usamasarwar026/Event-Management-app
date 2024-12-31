import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEvent, fetchEvents } from './../store/events/eventsSlice';  // Import fetchEvents action

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the createEvent action with form data
      await dispatch(createEvent({ title, description, date, location }));

      // After successfully creating the event, reload the events from the API
      await dispatch(fetchEvents());

      // Navigate to the home page after event creation
      navigate('/');
    } catch (error) {
      // console.error('Event creation failed:', error);
    }
  };

  return (
    <div className="max-w-md p-4 bg-gray-600 text-white mx-auto m-8 rounded-[20px]">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 outline-none text-black rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 outline-none text-black rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 outline-none text-black rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border outline-none text-black rounded"
          />
        </div>
        <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
