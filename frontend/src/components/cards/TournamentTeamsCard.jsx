import React from 'react'

function TournamentTeamsCard({title, teams}) {
  return (
    <div className='col-md-4 border'>
      <div className='card border-0 shadow-sm'>
        <div className='card-body text-center'>
          <h6 className='fw-bold'>{title}</h6>
          <div className='d-flex flex-wrap gap-2 mt-2'>
            {teams.map(team => (
              <span key={team.id} className='badge bg-primary'>{team.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentTeamsCard