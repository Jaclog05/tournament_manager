import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tournamentService } from '../services/api';
import StandingsTable from '../components/standingsTable/StandingsTable';

const App = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    tournamentService.getStandings(id).then(res => setData(res.data));
  }, [id]);

  return <StandingsTable data={data} />
};

export default App;