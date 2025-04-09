
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   alert("Please login or sign up first")
//   const user = (localStorage.getItem('user'));
//   return user ? children : <Navigate to="/login" />;
 
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user =(localStorage.getItem('user'));

  if (!user) {
   
    return    <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

