import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../utils/Api';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const JobDetailsCard = () => {
  const [job, setJobs] = useState([]);
const params=useParams()
  const {id}=params
console.log(id)
  useEffect(() => {
    // Fetch jobs from the backend
    console.log("user effet call")
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/jobs/${id}`); // Replace with your backend endpoint
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);
console.log(job)
  const pageStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '20px',
  };

  const cardStyles = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flex: '1 1 calc(50% - 20px)', // For responsive grid
    boxSizing: 'border-box',
  };

  const titleStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '10px',
  };

  const detailStyles = {
    fontSize: '14px',
    color: '#4a5568',
    marginBottom: '6px',
  };

  const buttonStyles = {
    backgroundColor: '#38b2ac',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: '10px',
    marginRight: '10px',
  };

  return (
    <div>
        <Navbar/>
    <div style={pageStyles}>
      {job.length!==0 && 
        <div key={job._id} style={cardStyles}>
          <h2 style={titleStyles}>{job.postName}</h2>
          <p style={detailStyles}><strong>Recruitment Board:</strong> {job.recruitmentBoard}</p>
          <p style={detailStyles}><strong>Location:</strong> {job.location}</p>
          <p style={detailStyles}><strong>Job Type:</strong> {job.jobType}</p>
          <p style={detailStyles}><strong>Category:</strong> {job.jobCategory}</p>
          <p style={detailStyles}><strong>Salary:</strong> ₹{job.salaryRange?.min} - ₹{job.salaryRange?.max}</p>
          <p style={detailStyles}><strong>Experience Required:</strong> {job.experienceRequired}</p>
          <p style={detailStyles}><strong>Last Date to Apply:</strong> {new Date(job.lastDate).toLocaleDateString()}</p>
          <p style={detailStyles}><strong>Status:</strong> {job.status}</p>
          <p style={detailStyles}><strong>Qualifications:</strong> {job.qualification.join(', ')}</p>
          <p style={detailStyles}><strong>Skills:</strong> {job.skills.join(', ')}</p>
          <p style={detailStyles}><strong>Contact Email:</strong> {job.contactEmail}</p>
          <p style={detailStyles}><strong>Contact Phone:</strong> {job.contactPhone}</p>
          <p style={detailStyles}><strong>More Info:</strong> {job.moreInformation}</p>

          
        </div>
}
    </div>
    </div>
  );
};

export default JobDetailsCard;
