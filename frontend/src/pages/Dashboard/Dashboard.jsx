import React from 'react'
import QuickStatCard from '../../components/cards/QuickStatCard'
import TournamentCard from '../../components/cards/TournamentCard'

function Dashboard() {
  return (
    <div className='vh-100 w-100 d-flex flex-column pt-4 px-5 gap-3'>
      <h1 style={{fontSize: '36px'}}>Hola, Usuario</h1>
      <div id="section" className="p-3">
        <h3 style={{fontSize: '24px'}}>Estadísticas Rápidas</h3>
        <div 
          id="cards-container"
          className='d-flex flex-row align-items-stretch'
          style={{height: '120px', gap: '1rem'}}
        >
          <QuickStatCard amount={5} label='Torneos'/>
          <QuickStatCard amount={12} label='Equipos'/>
          <QuickStatCard amount={8} label='Partidos'/>
          <QuickStatCard label='Nuevo'/>
        </div>
      </div>
      <hr />
      <div id="section" className="p-3">
        <h3 style={{fontSize: '24px'}}>Torneos Activos</h3>
        <div 
          id="cards-container"
          className='d-flex flex-row align-items-stretch'
          style={{height: '120px', gap: '1rem'}}
        >
          <TournamentCard tournamentName="Liga Amateur A" teamsAmount={12}/>
          <TournamentCard tournamentName="Liga Regional" teamsAmount={8}/>
          <TournamentCard tournamentName="Champions Youth" teamsAmount={20}/>
          <TournamentCard tournamentName="Copa Internacional" teamsAmount={5}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard