import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { teamService } from "../services/api";
import TeamList from "../components/TeamList";

function TournamentTeams() {
  const { id } = useOutletContext();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    teamService.getByTournament(id).then((res) => setTeams(res.data.teams));
  }, [id]);

  return <TeamList teams={teams} />;
}

export default TournamentTeams;
