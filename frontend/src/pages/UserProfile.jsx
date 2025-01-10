
import React, { useEffect, useState } from 'react'
import { Edit2, Save, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../redux/Auth/action'

const UserProfile = () => {
    const dispatch=useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [profileImage, setProfileImage] = useState('https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg')
   
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

    // Removed unused uploadButtonStyles

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
    const token=localStorage.getItem('token')

    useEffect(() => {
        dispatch(getUser())
    }, [])

const { user = {}, loading } = useSelector((state) => state.AuthReducer)
console.log(user,loading)

const [editedDetails, setEditedDetails] = useState({})
const [userDetails, setUserDetails] = useState({})

useEffect(() => {
    setEditedDetails(user)
    setUserDetails(user)
}, [user])

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
       dispatch(updateUser(editedDetails)).then(()=>{
        dispatch(getUser() )
        setIsEditing(false)
       })
                
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditedDetails(user)
    }
    return (
        <div>
            <Navbar />
            {user ? (
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
                        {userDetails &&Object.entries(userDetails)
                            .filter(([key]) => !['documents', 'applications', 'createdAt', 'updatedAt',"_id"].includes(key))
                            .map(([key, value]) => (
                                <div key={key} style={fieldStyles}>
                                    <label style={labelStyles}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    {isEditing ? (
                                        key === 'about' ? (
                                            <textarea
                                                style={textareaStyles}
                                                value={editedDetails[key] || ''}
                                                onChange={(e) =>
                                                    setEditedDetails({
                                                        ...editedDetails,
                                                        [key]: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            <input
                                                style={inputStyles}
                                                value={editedDetails[key] || ''}
                                                onChange={(e) =>
                                                    setEditedDetails({
                                                        ...editedDetails,
                                                        [key]: e.target.value,
                                                    })
                                                }
                                            />
                                        )
                                    ) : (
                                        <div style={valueStyles}>{value}</div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>No user data available.</p>
            )}
        </div>
    );
    
}    
export default UserProfile

