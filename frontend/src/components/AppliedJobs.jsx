import React from 'react'
import JobCard from './JobCard'


const AppliedJobs = ({ appliedJobs }) => {
  const containerStyles = {
    padding: '',
    backgroundColor: '#f7fafc'
  }

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '5px',
    padding: '10px'
  }

  return (
    <div style={containerStyles}>
      <div style={gridStyles}>
        {appliedJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isApplied={true}
          />
        ))}
      </div>
    </div>
  )
}

export default AppliedJobs

