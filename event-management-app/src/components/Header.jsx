import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../store/auth/authSlice';
import PropTypes from 'prop-types';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-950 p-4">
      <nav className="flex  justify-between items-center p-3">
        <Link to="/" className="text-white text-2xl font-bold">Event Management App</Link>
        <div className='mr-5 '>
          {isAuthenticated ? (
            <>
              <Link to="/create-event" className="text-white mr-4">Create Event</Link>
              <button onClick={handleLogout} className="text-white border border-white px-6 py-3 rounded-[10px]">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4 border border-white px-6 py-3 rounded-[10px]">Login</Link>
              <Link to="/signup" className="text-white border border-white px-6 py-3 rounded-[10px]">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Header;

