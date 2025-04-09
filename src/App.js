
import './App.css';
import { Routes, Route,  useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Todo from './components/Todo';
import About from './components/About';
import UserManagement from './components/UserManagement';
import Weather from './components/Weather';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(() => (localStorage.getItem('user')));
  const navigate = useNavigate();

  
  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={ <Login />}
        />

        <Route
          path="/signup"
          element={ <SignUp /> }
        />


        <Route path="/about" element={<ProtectedRoute user={user}><About /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute user={user}><UserManagement /></ProtectedRoute>} />
        <Route path="/weather" element={<ProtectedRoute user={user}><Weather /></ProtectedRoute>} />
        <Route path="/todo" element={<ProtectedRoute user={user}><Todo /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
