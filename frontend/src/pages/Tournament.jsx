import React, { useState, useEffect, use } from 'react'
import { useParams } from 'react-router-dom'
import { tournamentService } from '../services/api'
import { FaShield } from "react-icons/fa6";

function Tournament() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [upComingMatches, setUpcomingMatches] = useState([]);
  const [finishedMatches, setFinishedMatches] = useState([])

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await tournamentService.getById(id)
        const tournamentData = await response.data;
        setData(tournamentData)

        const matches = tournamentData.tournament.Matches;
        const upcoming = matches
          .filter(match => match.status === 'scheduled')
          .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
        
        const finished = matches
          .filter(match => match.status === 'finished')
          .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate))

        setUpcomingMatches(upcoming);
        setFinishedMatches(finished);
      } catch (error) {
        console.error("No se pudo obtener la información del torneo")
      }
    }

    fetchTournament();
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} - ${hours}:${minutes}`;
  }

  if (!data) {
    return <div className="vh-100 w-100 d-flex justify-content-center align-items-center" style={{paddingTop: '75px'}}>Cargando...</div>;
  }

  const tournament = data?.tournament;

  const formatTournamentDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  };

  return (
    <div className='vh-100 w-100 d-flex flex-column px-5 gap-3' style={{paddingTop: '75px'}}>

      <div className='mb-4 d-flex flex-column align-items-center gap-2'>
        <h1 className='fw-bold text-center'>{tournament.name}</h1>
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <span className='text-muted'>
            {formatTournamentDate(tournament.startDate)} - {formatTournamentDate(tournament.endDate)}
          </span>
        </div>
        <span className='badge bg-success text-center'>{tournament.status}</span>
      </div>

      <div className='d-flex justify-content-center gap-5'>
        <div className='col-md-4 border'>
          <div className='card border-0 shadow-sm'>
            <div className='card-body'>
              <h5 className='card-title fw-bold mb-3 text-center'>Proximos Partidos</h5>
              <div className='d-flex flex-column gap-3'>
                {upComingMatches.length > 0 ? (
                  upComingMatches.slice(0, 5).map(match => (
                    <div key={match.id} className='border-bottom p-3 border'>
                      <div className='d-flex flex-column justify-content-between'>
                        <div className='d-flex justify-content-around text-center align-items-center'>
                          <FaShield style={{fontSize: '24px'}}/>
                          <span className='fw-bold'>{match.homeTeam.name}</span>
                          <span className='text-muted small'>Vs.</span>
                          <span className='fw-bold'>{match.awayTeam.name}</span>
                          <FaShield style={{fontSize: '24px'}}/>
                        </div>
                        <div className='text-center'>
                          <span className='text-muted d-block'>{formatDate(match.matchDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No hay próximos partidos</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4 border'>
          <div className='card border-0 shadow-sm'>
            <div className='card-body'>
              <h5 className='card-title fw-bold mb-3 text-center'>Ultimos Resultados</h5>
              <div className="d-flex flex-column gap-3">
                {finishedMatches.length > 0 ? (
                  finishedMatches.slice(0, 5).map(match => (
                    <div key={match.id} className="border-bottom p-3 border">
                      <div className='d-flex flex-column justify-content-between'>
                        <div className='d-flex justify-content-around text-center align-items-center'>
                          <FaShield style={{fontSize: '24px'}}/>
                          <span className="fw-bold">{match.homeTeam.name}</span>
                          <span className="fw-bold fs-5">{match.goalsHomeTeam} - {match.goalsAwayTeam}</span>
                          <span className="fw-bold">{match.awayTeam.name}</span>
                          <FaShield style={{fontSize: '24px'}}/>
                        </div>
                        <div className="text-center">
                          <span className="text-muted small">{match.status}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No hay resultados recientes</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div className='d-flex justify-content-center gap-5'>
          <div className='col-md-4 border'>
            <div className='card border-0 shadow-sm'>
              <div className='card-body text-center'>
                <h6 className='fw-bold'>Equipos Participantes</h6>
                <div className='d-flex flex-wrap gap-2 mt-2'>
                  {tournament.Teams.map(team => (
                    <span key={team.id} className='badge bg-primary'>{team.name}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
          <div className='col-md-4 border'>
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h6 className="fw-bold">Creador del Torneo</h6>
                <p className="mb-0">{tournament.User.name}</p>
                <small className="text-muted">{tournament.User.email}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Tournament