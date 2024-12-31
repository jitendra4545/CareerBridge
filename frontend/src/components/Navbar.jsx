import React, { useState } from 'react'
import { Search, ArrowLeft, ArrowRight, RotateCcw, Maximize } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = ({ title = "Career Bridge", userName = "User Name" }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
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
    alignItems: 'center',
    gap: '8px',
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

  return (
    <header style={headerStyles}>
      <div style={navigationStyles}>
        {/* <button style={actionButtonStyles}><ArrowLeft size={20} /></button>
        <button style={actionButtonStyles}><ArrowRight size={20} /></button>
        <button style={actionButtonStyles}><RotateCcw size={20} /></button> */}
        <span style={{ margin: '0 8px' }}>{title}</span>
      </div>

      <div style={searchContainerStyles}>
        <input 
          type="text" 
          placeholder="Search..." 
          style={searchStyles}
        />
      </div>

      <button style={actionButtonStyles}><Search size={20} /></button>
      {/* <button style={actionButtonStyles}><Maximize size={20} /></button> */}

      <div style={profileContainerStyles}>
        <button 
          style={profileButtonStyles}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div style={profileImageStyles}></div>
          <span>Hi, {userName}</span>
        </button>

        <div style={dropdownStyles}>
         <Link to={'/profile'}><button style={dropdownItemStyles}>Profile view/edit</button></Link> 
         <Link to="/upload-docs"><button style={dropdownItemStyles}>View/upload docs</button></Link> 
          <button style={dropdownItemStyles}>Logout</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

