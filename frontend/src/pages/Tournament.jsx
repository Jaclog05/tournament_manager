import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tournamentService } from "../services/api";
import TournamentHeader from "../components/TournamentHeader";
import MatchList from "../components/MatchList";
import TournamentTeamsCard from "../components/cards/TournamentTeamsCard";
import TournamentCreatorCard from "../components/cards/TournamentCreatorCard";

function Tournament() {
  const { id } = useParams();
  const [tournamentData, setTournamentData] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await tournamentService.getById(id);
        const data = await response.data.tournament;
        setTournamentData(data);
      } catch (error) {
        console.error("No se pudo obtener la información del torneo");
      }
    };

    fetchTournament();
  }, [id]);

  if (!tournamentData) {
    return (
      <div
        className="vh-100 w-100 d-flex justify-content-center align-items-center"
        style={{ paddingTop: "75px" }}
      >
        Cargando...
      </div>
    );
  }

  const {
    name,
    startDate,
    endDate,
    status,
    Teams,
    User,
    UpcomingMatches = [],
    FinishedMatches = [],
  } = tournamentData;

  return (
    <div
      className="vh-100 w-100 d-flex flex-column px-5 gap-3"
      style={{ paddingTop: "75px" }}
    >
      <TournamentHeader
        name={name}
        startDate={startDate}
        endDate={endDate}
        status={status}
      />
      <div className="d-flex justify-content-center gap-5">
        <MatchList title="Próximos Partidos" matches={UpcomingMatches} />
        <MatchList title="Partidos Finalizados" matches={FinishedMatches} />
      </div>

      <div className="d-flex justify-content-center gap-5">
        <TournamentTeamsCard title="Equipos Participantes" teams={Teams} />
        <TournamentCreatorCard title="Creador del Torneo" user={User} />
      </div>
    </div>
  );
}

export default Tournament;
