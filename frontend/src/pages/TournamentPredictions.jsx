import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tournamentService } from '../services/api';
import PredictionList from '../components/PredictionList';

const TournamentPredictions = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    tournamentService.getPredictions(id).then(res => setData(res.data))
  }, [id]);

  return <PredictionList data={data} />
};

export default TournamentPredictions;