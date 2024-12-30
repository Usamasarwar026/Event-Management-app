import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from './../store/events/eventsSlice';
import WelcomeSection from './WelcomeSection';

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events?.data || []); // Access data array
  const status = useSelector((state) => state.events.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);
    
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load events. Please try again later.</div>;
  }

  if (!events || events.length === 0) {
    return <div className="text-center p-10 font-[600px] text-[30px]">No events available.</div>;
  }

  return (
    <>
    <div className='mt-10'>

      <WelcomeSection/>
    <div className="container mx-auto mt-8 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-6 gap-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded  border-black bg-blue-950 text-white">
            <h2 className="text-xl font-bold">Title: {event.title}</h2>
            <p>Description: {event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default Home;
