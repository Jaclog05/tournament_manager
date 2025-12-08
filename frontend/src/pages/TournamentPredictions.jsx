import { useState, useEffect } from 'react';
import { tournamentService } from '../services/api';
import { useParams } from 'react-router-dom';
import PredictionCard from '../components/cards/predictionCard/PredictionCard';

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
    <div className="vh-100 w-100 d-flex flex-column px-5 gap-3" style={{paddingTop: '75px'}}>
      <div className="d-flex flex-column align-items-center gap-2">
        <h3 className="fw-bold text-center mb-0">Predicciones con IA</h3> {/* TODO: dynamic name */}
        <h3 className="fw-bold text-center mb-0">Liga de prueba predictiva 2024</h3> {/* TODO: dynamic name */}
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span className="text-muted">
            Enero 15 - Febrero 15 {/* TODO: dynamic date */}
          </span>
        </div>
        <span className="badge bg-success text-center">En curso</span> {/* TODO: dynamic status */}
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {predictions.map((match) => (
          <PredictionCard key={match.matchId} matchData={match} />
        ))}
      </div>
    </div>
  );
};

export default TournamentPredictions;