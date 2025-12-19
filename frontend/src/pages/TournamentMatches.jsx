import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom";
import { matchService } from "../services/api";
import MatchesCalendar from "../components/MatchesCalendar";

function TournamentMatches() {
  const { id } = useOutletContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    matchService.getByTournament(id).then(res => setData(res.data))
  }, [id])

  return <MatchesCalendar data={data} />
}

export default TournamentMatches