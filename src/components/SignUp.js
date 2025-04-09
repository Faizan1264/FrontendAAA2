// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './SignUp.css';
// import { Toaster, toast } from 'react-hot-toast';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
  

//   const API_URL = 'http://localhost:3002/api/users';



//   const handleForm = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API_URL}/sign`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message || 'User registered successfully!');
//         setFormData({ name: '', email: '', password: '' });
//       } else {
//         if (data.error === "User with same name and email already exists") {
//           toast.error("User with same name and email already exists");
//           setFormData({ name: '', email: '', password: '' });
//         } else if (data.error === "Email already exists") {
//           toast.error("Email already exists");
//           setFormData({ name: '', email: '', password: '' });
//         } else {
//           toast.error(data.error || "Something went wrong!");
//         }
//       }
//     } catch (err) {
//       toast.error('Internal Server Error');
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <>
//       <div className='signup-form-container'>
//         <div className='sign-main-container'>
//           <h2 className='register-heading'>Registration Form</h2>
//           <form className='sign-form' onSubmit={handleForm}>
//             <input
//               type='text'
//               name='name'
//               placeholder='Enter Your Name'
//               className='sign-name-input'
//               value={formData.name}
//               onChange={handleChange}
//             />

//             <input
//               type='email'
//               name='email'
//               placeholder='Enter Your Email'
//               className='sign-name-input'
//               value={formData.email}
//               onChange={handleChange}
//             />

//             <input
//               type='password'
//               name='password'
//               placeholder='Enter Your Password'
//               className='sign-name-input'
//               value={formData.password}
//               onChange={handleChange}
//             />

//             <button type='submit' className='sign-up-button'>
//               Sign Up
//             </button>
//           </form>

//           {/* <p>Already signed up? <Link to="/">Login Now</Link></p> */}
//           <p className='sign-para'>Already signed up? <Link to = '/login'>Login Now</Link></p>
//         </div>
//       </div>

//       <Toaster position="top-center" reverseOrder={false} />
//     </>
//   );
// };

// export default SignUp;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { Toaster, toast } from 'react-hot-toast';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const API_URL = 'http://localhost:3002/api/users/register';

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) navigate('/');
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success( 'User registered successfully!');
        setFormData({ name: '', email: '', password: '' });
        localStorage.setItem('user', JSON.stringify(data.user));
              // toast.success('User login successful!');
              navigate('/');
        // navigate('/login');
        
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (err) {
      toast.error('Internal Server Error');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className='signup-form-container'>
        <div className='sign-main-container'>
          <h2 className='register-heading'>create an account</h2>
          <form className='sign-form' onSubmit={handleForm}>
            <input
              type='text'
              name='name'
              placeholder='Enter Your Name'
              className='sign-name-input'
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type='email'
              name='email'
              placeholder='Enter Your Email'
              className='sign-name-input'
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type='password'
              name='password'
              placeholder='Enter Your Password'
              className='sign-name-input'
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type='submit' className='sign-up-button'>Signup</button>
          </form>

          <p className='sign-para'>
            Already have an account? <Link to='/login' className='sign-page'>Login</Link>
          </p>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default SignUp;
