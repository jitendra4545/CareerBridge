'use client'

import React, { useState } from 'react'
import { Camera, Edit2, Save, X } from 'lucide-react'
import Navbar from '../components/Navbar'

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profileImage, setProfileImage] = useState('https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg')
    const [userDetails, setUserDetails] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        address: '123 Street, City, Country',
        qualification: 'Bachelor of Technology',
        experience: '5 years',
        skills: 'React, JavaScript, Node.js',
        about: 'Passionate developer with experience in web development and software engineering.'
    })

    const [editedDetails, setEditedDetails] = useState(userDetails)

    const containerStyles = {
        maxWidth: '800px',
        margin: '10px auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }

    const headerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px'
    }

    const titleStyles = {
        fontSize: '24px',
        color: '#2d3748',
        fontWeight: 'bold',
        marginBottom: '20px'
    }

    const buttonStyles = {
        backgroundColor: '#38b2ac',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }

    const cancelButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#e53e3e'
    }

    const imageContainerStyles = {
        position: 'relative',
        width: '100px',
        height: '100px',
        marginBottom: '20px'
    }

    const imageStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover'
    }

    const uploadButtonStyles = {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        backgroundColor: '#38b2ac',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    }

    const detailsContainerStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f7fafc',
        borderRadius: '8px'
    }

    const fieldStyles = {
        marginBottom: '15px'
    }

    const labelStyles = {
        display: 'block',
        fontSize: '14px',
        color: '#4a5568',
        marginBottom: '5px',
        fontWeight: '500'
    }

    const inputStyles = {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '14px'
    }

    const textareaStyles = {
        ...inputStyles,
        minHeight: '100px',
        resize: 'vertical'
    }

    const valueStyles = {
        fontSize: '16px',
        color: '#2d3748'
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = () => {
        setUserDetails(editedDetails)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedDetails(userDetails)
        setIsEditing(false)
    }

    return (
        <div>
            <Navbar/>
            <div style={containerStyles}>
                <div style={headerStyles}>
                    <h1 style={titleStyles}>Profile Details</h1>
                    <div style={imageContainerStyles}>
                        <img
                            src={profileImage}
                            alt="Profile"
                            style={imageStyles}
                        />
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        {/* <label htmlFor="imageUpload" style={uploadButtonStyles}>
                            <Camera size={20} />
                        </label> */}
                    </div>
                    {!isEditing ? (
                        <button
                            style={buttonStyles}
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit2 size={18} />
                            Edit Profile
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={cancelButtonStyles} onClick={handleCancel}>
                                <X size={18} />
                                Cancel
                            </button>
                            <button style={buttonStyles} onClick={handleSave}>
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>

                <div style={detailsContainerStyles}>
                    {Object.entries(userDetails).map(([key, value]) => (
                        <div key={key} style={fieldStyles}>
                            <label style={labelStyles}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            {isEditing ? (
                                key === 'about' ? (
                                    <textarea
                                        style={textareaStyles}
                                        value={editedDetails[key]}
                                        onChange={(e) => setEditedDetails({
                                            ...editedDetails,
                                            [key]: e.target.value
                                        })}
                                    />
                                ) : (
                                    <input
                                        style={inputStyles}
                                        value={editedDetails[key]}
                                        onChange={(e) => setEditedDetails({
                                            ...editedDetails,
                                            [key]: e.target.value
                                        })}
                                    />
                                )
                            ) : (
                                <div style={valueStyles}>{value}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
