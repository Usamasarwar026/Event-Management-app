import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Home from './../components/Home';
import SignUp from './../components/SignUp';
import Login from './../components/Login';
import CreateEvent from './../components/CreateEvent';
// import PrivateRoute from './PrivateRoute';

const Routers = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Make Home route private */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/create-event"
              element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default Routers;
