import { useState, useEffect } from 'react';
import { tournamentService } from '../services/api';
import { useParams } from 'react-router-dom';
import TournamentHeader from '../components/TournamentHeader';
import StandingsTable from '../components/standingsTable/StandingsTable';

const App = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await tournamentService.getStandings(id);
        const standingsData = await response.data;
        setData(standingsData);
      } catch (error) {
        console.error("No se pudo obtener la información de la tabla de posiciones");
      }
    }
    fetchStandings();
  }, []);

  return (
    <div
      className='vh-100 w-100 d-flex flex-column px-5 gap-3'
      style={{paddingTop: '75px'}}
    >
      <TournamentHeader
        section="Tabla de Posiciones" /* TODO: dynamic name */
        tournamentName="Liga de Prueba Predictiva 2024" /* TODO: dynamic name */
        startDate="2024-01-01T00:00:00.000Z" /* TODO: dynamic date */
        endDate="2024-12-31T00:00:00.000Z" /* TODO: dynamic date */
        status="En curso" /* TODO: dynamic status */
      />
      <StandingsTable data={data} />
    </div>
  );
};

export default App;