

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import './Login.css';

const API_URL = 'http://localhost:3002/api/users/register';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('User login successful!');
      navigate('/');

    
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='login-form-container'>
        <div className='login-main-container'>
          <h2 className='login-heading'>login to your account</h2>

          {error && <div className="error-message">{error}</div>}

          <form className='login-form' onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className='login-name-input'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className='login-name-input'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className='login-up-button' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className='login-para'>
            Don't have an account? <Link to='/signup' className='sign-page'>SignUp</Link>
          </p>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Login;
