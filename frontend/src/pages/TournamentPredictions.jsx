import { useState, useEffect } from 'react';
import { tournamentService } from '../services/api';
import { useParams } from 'react-router-dom';
import TournamentHeader from '../components/TournamentHeader';
import PredictionList from '../components/PredictionList';

const TournamentPredictions = () => {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await tournamentService.getPredictions(id);
        const predictionsData = await response.data;
        setData(predictionsData);
      } catch (error) {
        console.error('No se pudo obtener la información de las predicciones del torneo');
      }
    };
    fetchPredictions();
  }, [id]);


  if (!data) return <div>Cargando predicciones...</div>;

  const { predictions } = data;

  return (
    <div
      className="vh-100 w-100 d-flex flex-column px-5 gap-3"
      style={{paddingTop: '75px'}}
    >
      <TournamentHeader
        section="Predicciones con IA"
        tournamentName="Liga de Prueba Predictiva 2024" /* TODO: dynamic name */
        startDate="2024-01-01T00:00:00.000Z" /* TODO: dynamic date */
        endDate="2024-12-31T00:00:00.000Z" /* TODO: dynamic date */
        status="En curso" /* TODO: dynamic status */
      />
      <PredictionList predictions={predictions} />
    </div>
  );
};

export default TournamentPredictions;