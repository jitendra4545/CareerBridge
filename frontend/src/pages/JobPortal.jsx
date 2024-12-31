import React, { useState } from 'react'
import AppliedJobs from '../components/AppliedJobs'
import AllJobs from '../components/AllJobs'
import Navbar from '../components/Navbar'


const JobPortal = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [appliedJobs, setAppliedJobs] = useState([])

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  }

  const tabContainerStyles = {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px'
  }

  const tabStyles = (isActive) => ({
    padding: '10px 20px',
    backgroundColor: isActive ? '#38b2ac' : 'white',
    color: isActive ? 'white' : '#38b2ac',
    border: `2px solid ${isActive ? '#38b2ac' : '#CBD5E0'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  })

  // Sample jobs data
  const allJobs = [
    {
      id: 1,
      recruitmentBoard: 'State Public Service Commission',
      postName: 'Administrative Officer',
      qualification: 'Bachelor\'s Degree',
      postDate: '2024-01-01',
      lastDate: '2024-02-01',
      details: 'Looking for experienced administrators',
      status: 'Under Review',
      paymentStatus: 'Paid'
    },
    {
      id: 2,
      recruitmentBoard: 'Railway Recruitment Board',
      postName: 'Junior Engineer',
      qualification: 'B.Tech/Diploma',
      postDate: '2024-01-05',
      lastDate: '2024-02-05',
      details: 'Technical position for railway maintenance',
      status: 'Accepted',
      paymentStatus: 'Pending'
    },
    {
      id: 3,
      recruitmentBoard: 'Staff Selection Commission',
      postName: 'Tax Inspector',
      qualification: 'Bachelor\'s Degree',
      postDate: '2024-01-10',
      lastDate: '2024-02-10',
      details: 'Tax collection and enforcement',
      status: 'Rejected',
      paymentStatus: 'Pending',
    }      
  ]

  const handleApply = (jobId) => {
    const jobToApply = allJobs.find(job => job.id === jobId)
    if (jobToApply && !appliedJobs.find(job => job.id === jobId)) {
      setAppliedJobs([...appliedJobs, {
        ...jobToApply,
        status: 'Under Review',
        paymentStatus: 'Pending'
      }])
    }
  }

  return (
    <div>
         <Navbar/>
   
    <div style={containerStyles}>
       
      <div style={tabContainerStyles}>
        <button 
          style={tabStyles(activeTab === 'applied')}
          onClick={() => setActiveTab('applied')}
        >
          Applied Jobs ({appliedJobs.length})
        </button>
        <button 
          style={tabStyles(activeTab === 'all')}
          onClick={() => setActiveTab('all')}
        >
          All Jobs
        </button>
      </div>

      {activeTab === 'all' ? (
        <AllJobs jobs={allJobs} onApply={handleApply} />
      ) : (
        <AppliedJobs appliedJobs={appliedJobs} />
      )}
    </div>
    </div>
  )
}

export default JobPortal

