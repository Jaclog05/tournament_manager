import React, { useState, useEffect } from 'react'
import QuickStatCard from '../../src/components/cards/QuickStatCard'
import TournamentCard from '../../src/components/cards/TournamentCard'
import { dashboardService } from '../../src/services/api'
import { useAuth } from '../../src/context/AuthContext'

function Dashboard() {
  const [stats, setStats] = useState({ tournaments: 0, teams: 0, matches: 0 })
  const [activeTournaments, setActiveTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsResponse, tournamentsResponse] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getActiveTournaments()
        ])

        setStats(statsResponse.data)
        setActiveTournaments(tournamentsResponse.data)
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className='vh-100 w-100 d-flex flex-column px-5 gap-3' style={{paddingTop: '75px'}}>
        <div className="text-center">Cargando...</div>
      </div>
    )
  }

  return (
    <div className='vh-100 w-100 d-flex flex-column px-5 gap-3' style={{paddingTop: '75px'}}>
      <h1 style={{fontSize: '36px'}}>Hola, {user?.name || 'Usuario'}</h1>
      
      <div id="section" className="p-3">
        <h3 style={{fontSize: '24px'}}>Estadísticas Rápidas</h3>
        <div 
          id="cards-container"
          className='d-flex flex-row align-items-stretch'
          style={{height: '120px', gap: '1rem'}}
        >
          <QuickStatCard amount={stats.tournaments} label='Torneos'/>
          <QuickStatCard amount={stats.teams} label='Equipos'/>
          <QuickStatCard amount={stats.matches} label='Partidos'/>
          <QuickStatCard label='Nuevo'/>
        </div>
      </div>

      <hr />
      
      <div id="section" className="p-3">
        <h3 style={{fontSize: '24px'}}>Torneos Activos</h3>
        <div 
          id="cards-container"
          className='d-flex flex-row align-items-stretch flex-wrap'
          style={{gap: '1rem'}}
        >
          {activeTournaments.map(tournament => (
            <TournamentCard 
              key={tournament.id}
              tournamentName={tournament.name}
              teamsAmount={tournament.teams.length}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard