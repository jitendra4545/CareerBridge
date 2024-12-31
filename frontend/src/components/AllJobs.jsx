import React from 'react'
import JobCard from './JobCard'
// import JobCard from './job-card'

const AllJobs = ({ jobs, onApply }) => {
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
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isApplied={false}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  )
}

export default AllJobs

