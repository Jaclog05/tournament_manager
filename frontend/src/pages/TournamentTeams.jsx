import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { teamService } from "../services/api";
import TournamentHeader from "../components/TournamentHeader";
import TeamList from "../components/TeamList";

function TournamentTeams() {
  const [teams, setTeams] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTournamentTeams = async () => {
      try {
        const response = await teamService.getByTournament(id);
        const teamsData = await response.data;
        setTeams(teamsData.teams);
      } catch (error) {
        console.error(
          "No se pudo obtener la información de los equipos del torneo"
        );
      }
    };
    fetchTournamentTeams();
  }, []);

  return (
    <div
      className="vh-100 w-100 d-flex flex-column px-5 gap-3"
      style={{ paddingTop: "75px" }}
    >
      <TournamentHeader
        section="Equipos" /* TODO: dynamic name */
        tournamentName="Liga de Prueba Predictiva 2024" /* TODO: dynamic name */
        startDate="2024-01-01T00:00:00.000Z" /* TODO: dynamic date */
        endDate="2024-12-31T00:00:00.000Z" /* TODO: dynamic date */
        status="En curso" /* TODO: dynamic status */
      />
      <TeamList teams={teams} />
    </div>
  );
}

export default TournamentTeams;
