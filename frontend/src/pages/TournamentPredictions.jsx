import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { tournamentService } from '../services/api';
import PredictionList from '../components/PredictionList';

const TournamentPredictions = () => {
  const { id } = useOutletContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    tournamentService.getPredictions(id).then(res => setData(res.data))
  }, [id]);

  return <PredictionList data={data} />
};

export default TournamentPredictions;