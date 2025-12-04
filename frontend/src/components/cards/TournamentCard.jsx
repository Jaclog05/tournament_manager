import React from 'react'
import { FaTrophy } from "react-icons/fa";

function TournamentCard({tournamentName, teamsAmount}) {
  return (
    <div
      className="card d-flex flex-row justify-content-start align-items-center gap-2 px-3"
      style={{width: '180px', height: '100%'}}
    >
      <FaTrophy style={{fontSize: '24px'}}/>
      <div className='d-flex flex-column gap-1' style={{fontSize: '12px'}}>
        <p className='mb-0' style={{fontWeight: 'bold'}}>{tournamentName}</p>
        <p className='mb-0'>{teamsAmount} teams</p>
      </div>
    </div>
  )
}

export default TournamentCard