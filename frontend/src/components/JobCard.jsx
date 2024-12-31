import React from 'react';

const JobCard = ({ job, isApplied, onApply, onNotify, onShowMore }) => {
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

  const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '10px', // Padding for the page
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

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h3 style={titleStyles}>{job.postName}</h3>
        <div style={detailStyles}>
          <strong>Recruitment Board:</strong> {job.recruitmentBoard}
        </div>
        <div style={detailStyles}>
          <strong>Qualification:</strong> {job.qualification}
        </div>
        <div style={detailStyles}>
          <strong>Post Date:</strong> {job.postDate}
        </div>
        <div style={detailStyles}>
          <strong>Last Date:</strong> {job.lastDate}
        </div>
        <div style={detailStyles}>
          <strong>Details:</strong> {job.details}
        </div>
        {isApplied ? (
          <div style={{ marginTop: '10px' }}>
            <div style={statusStyles}>Status: {job.status}</div>
            <div style={paymentStatusStyles}>
              Payment: {job.paymentStatus}
            </div>
          </div>
        ) : (
          <button
            style={buttonStyles}
            onClick={() => onApply(job.id)}
          >
            Apply Now
          </button>
        )}
        <button
          style={buttonStyles}
          onClick={() => onNotify(job.id)}
        >
          Notify Me
        </button>
        <button
          style={buttonStyles}
          onClick={() => onShowMore(job.id)}
        >
          Show More Information
        </button>
        {job.downloadLink && (
          <a
            href={job.downloadLink}
            download
            style={{
              ...buttonStyles,
              textDecoration: 'none',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default JobCard;
