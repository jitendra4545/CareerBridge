import React from 'react'
import JobCard from './JobCard'
import { AppliedJobCard } from './AppliedJobCard'


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
console.log("ddssadas",appliedJobs)
  return (
    <div style={containerStyles}>
      <div style={gridStyles}>
        {appliedJobs.map(job => (
          <AppliedJobCard
            key={job.id}
            job={job?.application}
            isApplied={true}
          />
        ))}
      </div>
    </div>
  )
}

export default AppliedJobs

