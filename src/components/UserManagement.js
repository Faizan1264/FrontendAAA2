

import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email : '',
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // API base URL
  const API_URL = 'http://localhost:3002/api/users';

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      toast.error(err.message || 'Error fetching users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
  
      const requestBody = {
        name: formData.name.trim(),
        email: formData.email.trim()
      };
  
      let response;
  
      if (editingId) {
        // Update existing user
        response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(requestBody)
        });
      } else {
        // Create new user
        response = await fetch(`${API_URL}/add`, {
          method: 'POST',
          headers,
          body: JSON.stringify(requestBody)
        });
      }
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Operation failed');
      }
  
      toast.success(editingId ? 'User updated successfully!' : 'User added successfully!');
      fetchUsers();
      resetForm();
  
    } catch (err) {
      const errorMessage = err.message;
  
      if (errorMessage.includes("User with same name and email already exists")) {
        toast.error("This user already exists with the same name and email.");
        setFormData({
          name : '',
          email : ''
        })
      } else if (errorMessage.includes("Email already exists")) {
        toast.error("Email already exists. Please use a different one.");
        setFormData({
          name : '',
          email : '',
        })
      } else {
        toast.error(errorMessage || "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  // Reset form and editing state
  const resetForm = () => {
    setFormData({ name: '', email : '' });
    setEditingId(null);
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
    });
    setEditingId(user._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete user');
        }

        toast.success('User deleted successfully!');
        fetchUsers();
      } catch (err) {
        toast.error(err.message || 'Error deleting user');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
            maxWidth: '500px'
          }
        }}
      />
      
      <div className='main-user-container'>
        <div className='form-container' >
          <h3 className='user-heading'>{editingId ? 'Edit User' : 'User Management App'}</h3>

          <form onSubmit={handleSubmit} className="user-form" >
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className='user-name-input'
              value={formData.name}
              onChange={handleChange}
              required
            />

            
             <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className='user-name-input'
              value={formData.email}
              onChange={handleChange}
              required
            />
           
            <div className="form-actions" >
              <button type="submit" disabled={isLoading} className='add-button-user'>
                {isLoading ? 'Processing...' : editingId ? 'Update User' : 'Add User'}
              </button>
              {editingId && (
                <button 
                  type="button" 

                  onClick={resetForm}
                  className="cancel-btn"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="users-list-container" >
            <h3 className='user-heading'>Users List</h3>
            {isLoading && users.length === 0 ? (
              <p className="loading-message">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="no-users">No users found</p>
            ) : (
              <div className="table-container" >
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td >{user.name}</td>
                        <td  >{user.email}</td>
                        <td className="action-buttons">
                          <button
                             onClick={() => !isLoading && handleEdit(user)} 
                             className={`image-button-edit ${isLoading ? 'disabled' : ''}`}
                          >
                
                            Edit
                          </button>
                          
                          <button 
                             onClick={() => !isLoading && handleDelete(user._id)} 
                             className={`image-button ${isLoading ? 'disabled' : ''}`}
                          
                          >
                             Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;



