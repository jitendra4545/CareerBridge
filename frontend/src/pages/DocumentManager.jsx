
import React, { useEffect, useState } from 'react'
import { Eye, Trash2, ChevronDown, Search, ArrowLeft, ArrowRight, RotateCcw, Maximize, Upload } from 'lucide-react'
import Navbar from '../components/Navbar'
import BaseUrl from '../utils/Api'
import axios from 'axios'

const DocumentManager = () => {
  const [selectedDoc, setSelectedDoc] = useState('Address Proof')
  const [documents, setDocuments] = useState()
  const [isLoading, setIsLoading] = useState(false)
  // console.log(localStorage.getItem('token'))
  const getDocuments = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/aspirants/documents/all`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      console.log(res.data)
      setDocuments(res.data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  useEffect(() => {
    getDocuments()
  }, [])

  const uploadDocument = async (file) => {
    if (!file) return

    setIsLoading(true)

    // Simulate an upload process
    console.log('Uploading file:', file)

    // Create form data
    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentType', selectedDoc)

    try {
      const response = await axios.post(`${BaseUrl}/aspirants/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token')
        }
      })

      console.log('Upload successful:', response.data)
      getDocuments()
      // Update the documents state with the new document
      setDocuments((prevDocs) => [
        ...prevDocs,
        { type: selectedDoc, status: 'Pending' }
      ])
    } catch (error) {
      console.error('Error uploading document:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const mainContentStyles = {
    padding: '24px'
  }

  const uploadSectionStyles = {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px'
  }

  const selectStyles = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minWidth: '200px'
  }

  const uploadButtonStyles = {
    padding: '8px 16px',
    backgroundColor: '#0D9488',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const fileInputStyles = {
    display: 'none'
  }

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse'
  }

  const thStyles = {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #eee',
    color: '#666',
    fontWeight: 'normal'
  }

  const tdStyles = {
    padding: '12px',
    borderBottom: '1px solid #eee'
  }

  const statusStyles = (status) => {
    let backgroundColor, color
    switch (status) {
      case 'Accepted':
        backgroundColor = '#E8FFF3'
        color = '#0D9488'
        break
      case 'Rejected':
        backgroundColor = '#FFE8E8'
        color = '#D32F2F'
        break
      case 'Pending':
      default:
        backgroundColor = '#FFF9E6'
        color = '#B45309'
        break
    }
    return {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      backgroundColor,
      color
    }
  }

  const actionButtonStyles = {
    padding: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#666'
  }

  const handleDelete = async (documentId) => {
    console.log('Deleting document:', documentId)
    try {
      let res = await axios.delete(`${BaseUrl}/aspirants/document/${documentId}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      console.log(res.data)
      getDocuments()
    } catch (error) {
      console.error('Error deleting document:', error)

    }
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main style={mainContentStyles}>
        <div style={uploadSectionStyles}>
          {/* <label htmlFor="docType" style={{ marginRight: '8px' }}>Choose Document Type:</label> */}
          <select
            id="docType"
            style={selectStyles}
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
            disabled={isLoading}
          >
            <option value="" disabled>Choose Document Type</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN</option>
            <option value="Driving License">Driving License</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="file"
            id="fileUpload"
            style={fileInputStyles}
            onChange={(e) => uploadDocument(e.target.files[0])}
            disabled={isLoading}
          />
          <label htmlFor="fileUpload" style={{ ...uploadButtonStyles, backgroundColor: isLoading ? 'grey' : '#0D9488' }}>
            <Upload size={20} style={{ marginRight: '8px' }} />
            {isLoading ? 'Uploading...' : 'Upload File'}
          </label>
        </div>

        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Document Type</th>
              <th style={thStyles}>Status</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents?.map((doc, i) => (
              <tr key={i}>
                <td style={tdStyles}>{doc.documentType}</td>
                <td style={tdStyles}>
                  <span style={statusStyles(doc.isAcceptable)}>{doc.isAcceptable}</span>
                </td>
                <td style={tdStyles}>
                  <button style={actionButtonStyles} onClick={() => window.open(doc.documentURL, '_blank')} disabled={isLoading}>
                    <Eye size={20} color="#0D9488" />
                  </button>
                  <button style={actionButtonStyles} onClick={() => handleDelete(doc._id)} disabled={isLoading}>
                    {isLoading ? <RotateCcw size={20} color="grey" /> : <Trash2 size={20} color="#B45309" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default DocumentManager
