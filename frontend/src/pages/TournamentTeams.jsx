import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { teamService } from "../services/api";
import TeamCard from "../components/cards/TeamCard";

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
      <div className="mb-4 d-flex flex-column align-items-center gap-2">
        <h2 className="fw-bold text-center">Equipos</h2> {/* TODO: dynamic name */}
        <h2 className="fw-bold text-center">Liga de Prueba Predictiva 2024</h2> {/* TODO: dynamic name */}
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span className="text-muted">
            Enero 15 - Febrero 15 {/* TODO: dynamic date */}
          </span>
        </div>
        <span className="badge bg-success text-center">En curso</span> {/* TODO: dynamic status */}
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-5">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard
              key={team.id}
              name={team.name}
              playersAmout={team.Players.length}
            />
          ))
        ) : (
          <p>No hay equipos registrados en este torneo.</p>
        )}
      </div>
    </div>
  );
}

export default TournamentTeams;
