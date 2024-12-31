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
    <header className="bg-blue-950 lg:p-4">
      <nav className="flex  justify-between items-center px-2 py-4 lg:p-3 ">
        <Link to="/" className="text-white text-2xl font-bold">Event Management</Link>
        <div className='lg:mr-5 '>
          {isAuthenticated ? (
            <>
              <Link to="/create-event" className="text-white mr-4">Create Event</Link>
              <button onClick={handleLogout} className="text-white  border-white px-6 py-3 rounded-[10px]">Logout</button>
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

