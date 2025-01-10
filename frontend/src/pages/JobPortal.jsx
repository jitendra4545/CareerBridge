import React, { useEffect, useState } from 'react'
import AppliedJobs from '../components/AppliedJobs'
import AllJobs from '../components/AllJobs'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAppliedJobs, getJobs } from '../redux/Job/action'
import axios from 'axios'
import BaseUrl from '../utils/Api'


const JobPortal = () => {
  const [activeTab, setActiveTab] = useState('all')
  // const [appliedJobs, setAppliedJobs] = useState([])



  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getJobs())
    dispatch(getAppliedJobs())
  }, [])

  const { allJobs,appliedJobs, loading } = useSelector((state) => state.JobReducer)
  console.log(allJobs, loading,appliedJobs)
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


  const handleApply = (jobId) => {
    console.log(jobId)
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Authentication token is missing')
      return
    }
    axios.post(`${BaseUrl}/jobs/${jobId}/apply`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then((res) => {
     
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
console.log(localStorage.getItem('token'))

  return (
    <div>
      <Navbar />

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

