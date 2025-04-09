

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import './Header.css';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = (localStorage.getItem('user'));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsDropdownOpen(false);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <>
    
      <header className="main-header">
        <div className="logo-container">
          
          <img src="https://www.creativefabrica.com/wp-content/uploads/2019/11/18/awawaw_38-1-580x387.jpg"   alt="logo" className="logo-image" />
        </div>
       
      
        <img
          src={isMenuOpen ?  'https://cdn-icons-png.flaticon.com/128/10337/10337030.png' : 'https://cdn-icons-png.flaticon.com/128/13992/13992768.png'}
          alt="hamburger"
          className="humberger-image"
          onClick={toggleMenu}
        />

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="ul-container">
            <li><Link   className='link-items' to="/">Home</Link></li>
            {/* <li><Link className='link-items'  to="/about">About</Link></li> */}
            <li><Link className='link-items' to="/user">User App</Link></li>
            <li><Link  className='link-items' to="/weather">Weather App</Link></li>
            <li><Link  className='link-items' to="/todo">Todo App</Link></li>
          </ul>

          <div className="dropdown-container" ref={dropdownRef}>
            <button className="dropdown-toggle-button" onClick={toggleDropdown}>
              Account ▾
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {!user ? (
                  <>
                    <Link className='link-items' to="/signup"><button className="dropdown-item">Sign Up</button></Link>
                    <Link  className='link-items' to="/login"><button className="dropdown-item"  >Login</button></Link>
                  </>
                ) : (
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Header;
