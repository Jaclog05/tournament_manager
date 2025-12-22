import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { teamService } from "../services/api";
import TeamList from "../components/TeamList";

function TournamentTeams() {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    teamService.getByTournament(id).then((res) => setTeams(res.data.teams));
  }, [id]);

  return <TeamList teams={teams} />;
}

export default TournamentTeams;
