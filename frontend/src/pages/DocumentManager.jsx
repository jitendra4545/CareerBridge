'use client'

import React, { useState } from 'react'
import { Eye, Trash2, ChevronDown, Search, ArrowLeft, ArrowRight, RotateCcw, Maximize, Upload } from 'lucide-react'
import Navbar from '../components/Navbar'


const DocumentManager = () => {
  const [selectedDoc, setSelectedDoc] = useState('Address Proof')

  const documents = [
    { type: 'ID Proof', status: 'Verified' },
    { type: 'Education Certificate', status: 'Pending' },
    { type: 'Resume', status: 'Verified' }
  ]

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

  const statusStyles = (status) => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    backgroundColor: status === 'Verified' ? '#E8FFF3' : '#FFF9E6',
    color: status === 'Verified' ? '#0D9488' : '#B45309'
  })

  const actionButtonStyles = {
    padding: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#666'
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main style={mainContentStyles}>
        <div style={uploadSectionStyles}>
          <select 
            style={selectStyles}
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
          >
            <option>Address Proof</option>
            <option>ID Proof</option>
            <option>Education Certificate</option>
            <option>Resume</option>
          </select>
          <input
            type="file"
            id="fileUpload"
            style={fileInputStyles}
            onChange={(e) => {
              // Handle file upload logic here
              console.log('File selected:', e.target.files[0])
            }}
          />
          <label htmlFor="fileUpload" style={uploadButtonStyles}>
            <Upload size={20} style={{ marginRight: '8px' }} />
            Upload File
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
            {documents.map((doc) => (
              <tr key={doc.type}>
                <td style={tdStyles}>{doc.type}</td>
                <td style={tdStyles}>
                  <span style={statusStyles(doc.status)}>{doc.status}</span>
                </td>
                <td style={tdStyles}>
                  <button style={actionButtonStyles}><Eye size={20} /></button>
                  <button style={actionButtonStyles}><Trash2 size={20} /></button>
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

