import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AppliedJobCard = ({ job, isApplied, onMoreInfo, onWithdraw }) => {
  const cardStyles = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flex: '1 1 calc(50% - 20px)', // Responsive grid
    boxSizing: 'border-box',
  };

  const titleStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '10px',
  };

  const detailStyles = {
    fontSize: '12px',
    color: '#4a5568',
    marginBottom: '6px',
  };

  const buttonStyles = {
    backgroundColor: '#3182CE',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: '10px',
    marginRight: '10px',
  };

  const statusStyles = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    marginRight: '10px',
    backgroundColor: job.status === 'Accepted' ? '#C6F6D5' : '#FED7D7',
    color: job.status === 'Accepted' ? '#2F855A' : '#C53030',
  };

  const paymentStatusStyles = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    backgroundColor: job.paymentStatus === 'Paid' ? '#C6F6D5' : '#FED7D7',
    color: job.paymentStatus === 'Paid' ? '#2F855A' : '#C53030',
  };

  const navigate=useNavigate()

  const handleSingle=(id)=>{
navigate(`/job-details/${id}`)
  }



  return (
    <div style={cardStyles}>
      <h3 style={titleStyles}>{job?.jobId?.postName}</h3>
      <p style={detailStyles}>
        <strong>Recruitment Board:</strong> {job?.jobId?.recruitmentBoard}
      </p>
      <p style={detailStyles}>
        <strong>Status:</strong>{' '}
        <span style={statusStyles}>{job.status}</span>
      </p>
      <p style={detailStyles}>
        <strong>Applied Date:</strong> {new Date(job.appliedDate).toLocaleDateString()}
      </p>
      <p style={detailStyles}>
        <strong>Application Fee:</strong>{' '}
        <span style={paymentStatusStyles}>{job.paymentStatus}</span>
      </p>
      <p style={detailStyles}>
        <strong>Application Receipt:</strong> {job.receipt || 'To be Upload'}
      </p>
      <div>
        <button style={buttonStyles} onClick={() => handleSingle(job?.jobId?._id)}>
          More Information
        </button>
        {/* <button
          style={{ ...buttonStyles, backgroundColor: '#E53E3E' }}
          onClick={() => onWithdraw(job)}
        >
          Withdraw
        </button> */}
      </div>
    </div>
  );
};
