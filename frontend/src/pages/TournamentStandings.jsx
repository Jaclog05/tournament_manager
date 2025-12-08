import { useState, useEffect } from 'react';
import StandingsTable from '../components/standingsTable/StandingsTable';
import { tournamentService } from '../services/api';
import { useParams } from 'react-router-dom';

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
    <div className='vh-100 w-100 d-flex flex-column px-5 gap-3' style={{paddingTop: '75px'}}>
      <div className="mb-4 d-flex flex-column align-items-center gap-2">
        <h2 className="fw-bold text-center">Tabla de Posiciones</h2> {/* TODO: dynamic name */}
        <h2 className="fw-bold text-center">Liga de Prueba Predictiva 2024</h2> {/* TODO: dynamic name */}
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span className="text-muted">
            Enero 15 - Febrero 15 {/* TODO: dynamic date */}
          </span>
        </div>
        <span className="badge bg-success text-center">En curso</span> {/* TODO: dynamic status */}
      </div>
      <StandingsTable data={data} />
    </div>
  );
};

export default App;