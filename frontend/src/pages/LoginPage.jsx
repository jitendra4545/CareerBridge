import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseUrl from '../utils/Api';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin, UserRegister } from '../redux/Auth/action';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
const token1=localStorage.getItem('token')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    qualification: '',
    dateOfBirth: '',
    gender: '',
  });

  const navigate=useNavigate()
const dispatch=useDispatch()
const {user,token,loading,error}=useSelector(state=>state.AuthReducer)
console.log(loading,error,token1)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// console.log(BaseUrl)
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    if (isRegistering) {
      console.log('Registering user:', formData);
      // Registration logic goes here
      dispatch(UserRegister(formData)).then(()=>{
        navigate("/login")
        
      })
      // .then(()=>{
      // navigate("/login")
      // })
    } else {
      console.log('Logging in user:', { email: formData.email, password: formData.password });
      dispatch(UserLogin(formData)).then(()=>{  
        navigate("/user-page")
       
      } )
    }
  };
 
  return (
    <div
      style={{
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          background: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#38B2AC',
            marginBottom: '20px',
          }}
        >
          {isRegistering ? 'Your Career, Our Commitment' : 'Welcome Back!'}
        </h2>
        <form onSubmit={handleFormSubmit}>
          {isRegistering && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>Qualification</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #cbd5e0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #cbd5e0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
         <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#38b2ac',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#319795')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#38b2ac')}
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
          
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#4a5568', fontSize: '14px' }}>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={{
              color: '#38b2ac',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 'bold',
            }}
          >
            {isRegistering ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;



