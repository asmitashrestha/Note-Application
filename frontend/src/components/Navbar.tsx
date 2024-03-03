import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  useEffect(() => {
    // Check if user is already logged in based on local storage
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage and set isLoggedIn to false
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    // You can add any additional logout logic here
  };

  return (
    <div className='flex justify-between p-2.5'>
      <h2 className='font-bold ml-6 text-2xl text-gray-800 hover:text-blue-800'>MirageMemoir</h2>
      <nav className='flex'>
        <ul className='font-bold text-xl mr-96'>
          <Link className='text-gray-900 hover:text-green-950' to={'/notes'}>
            My Notes
          </Link>
        </ul>
        <ul className='font-bold text-xl mr-3'>
          {isLoggedIn ? (
            // If user is logged in, show Sign Out link
            <Link to={'/'} className='text-cyan-900 hover:text-green-950' onClick={handleLogout}>
              Sign Out
            </Link>
          ) : (
            // If user is not logged in, show Login link
            <Link to={'/login'} className='text-cyan-900 hover:text-green-950'>
              Login
            </Link>
          )}
        </ul>
        
        <ul className='mr-3 font-bold text-xl'>
          <Link to={'/add-notes'} className='text-gray-800 hover:text-blue-950'>
            Add Notes
          </Link>
        </ul>
        <ul className='mr-3 font-bold text-xl'>
          <Link to={'/settings'} className='text-gray-800 hover:text-blue-950'>
            Settings
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
