import { useState, useEffect } from "react"
import { matchService } from "../services/api";
import { useParams } from "react-router-dom";
import TournamentHeader from '../components/TournamentHeader';
import MatchesCalendar from "../components/MatchesCalendar";

function TournamentMatches() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await matchService.getByTournament(id)
        const matchesData = await response.data;
        setData(matchesData)
      } catch (error) {
        console.error("No se pudo obtener la información de los partidos del torneo")
      }
    }

    fetchMatches();
  }, [])

  if (!data) {
    return (
      <div
        className="vh-100 w-100 d-flex justify-content-center align-items-center"
        style={{ paddingTop: "75px" }}
      >
        Cargando...
      </div>
    );
  }

  const {matches = []} = data;

  return (
    <div
      className='vh-100 w-100 d-flex flex-column px-5 gap-3'
      style={{paddingTop: '75px'}}
    >
      <TournamentHeader
        section="Partidos"/* TODO: dynamic name */
        tournamentName="Liga de Prueba Predictiva 2024" /* TODO: dynamic name */
        startDate="2024-01-01T00:00:00.000Z" /* TODO: dynamic date */
        endDate="2024-12-31T00:00:00.000Z" /* TODO: dynamic date */
        status="En curso" /* TODO: dynamic status */
      />
      <MatchesCalendar matches={matches} />
    </div>
  )
}

export default TournamentMatches