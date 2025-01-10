import React, { useEffect, useState } from 'react'
import { Search, ArrowLeft, ArrowRight, RotateCcw, Maximize } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/Auth/action'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 16px', // Reduced padding top and bottom
    borderBottom: '1px solid #eee',
    gap: '12px'
  }

  const navigationStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  const searchContainerStyles = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  }

  const searchStyles = {
    width: '100%',
    maxWidth: '600px',
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px'
  }

  const profileContainerStyles = {
    position: 'relative'
  }

  const profileButtonStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px',
    border: 'none',
    background: 'none',
    cursor: 'pointer'
  }

  const profileImageStyles = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#0D9488'
  }

  const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '200px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    display: isProfileOpen ? 'block' : 'none',
    zIndex: 1000
  }

  const dropdownItemStyles = {
    padding: '12px 16px',
    display: 'block',
    textDecoration: 'none',
    color: '#333',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    fontSize: '14px'
  }

  const actionButtonStyles = {
    padding: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#666'
  }

  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

const {user,loading,error}=useSelector((state)=>state.AuthReducer)
console.log(user,loading,error)

  return (
    <header style={headerStyles}>
      <div style={navigationStyles}>
        {/* <button style={actionButtonStyles}><ArrowLeft size={20} /></button>
        <button style={actionButtonStyles}><ArrowRight size={20} /></button>
        <button style={actionButtonStyles}><RotateCcw size={20} /></button> */}
       <Link to={"/user-page"}> <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#38b2ac', marginBottom: '10px' }}>
          Career Bridge 
        </h1></Link>
      </div>

      <div style={searchContainerStyles}>
        <input 
          type="text" 
          placeholder="Search..." 
          style={searchStyles}
        />
      </div>

      {/* <button style={actionButtonStyles}><Search size={20} /></button> */}
      {/* <button style={actionButtonStyles}><Maximize size={20} /></button> */}

      <div style={profileContainerStyles}>
        <button 
          style={profileButtonStyles}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div style={profileImageStyles}></div>
          <span>Hi, {user?.name}</span>
        </button>

        <div style={dropdownStyles}>
         <Link to={'/profile'}><button style={dropdownItemStyles}>Profile view/edit</button></Link> 
         <Link to="/upload-docs"><button style={dropdownItemStyles}>View/upload docs</button></Link> 
         <button
  style={dropdownItemStyles}
  onClick={() => {
    localStorage.removeItem('token'); // Replace 'token' with the key you used for storing the token
    alert('You have been logged out.');
    window.location.reload(); // Optional: refresh the page or redirect to a login page
  }}
>
  Logout
</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
