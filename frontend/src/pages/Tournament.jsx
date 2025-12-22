import { useTournament } from '../context/TournamentContext';
import MatchList from "../components/MatchList";
import TournamentTeamsCard from "../components/cards/TournamentTeamsCard";
import TournamentCreatorCard from "../components/cards/TournamentCreatorCard";

function Tournament() {
  const { tournament } = useTournament();

  return (
    <>
      <div className="d-flex justify-content-center gap-5">
        <MatchList
          title="Próximos Partidos"
          matches={tournament.UpcomingMatches}
        />
        <MatchList
          title="Partidos Finalizados"
          matches={tournament.FinishedMatches}
        />
      </div>

      <div className="d-flex justify-content-center gap-5">
        <TournamentTeamsCard
          title="Equipos Participantes"
          teams={tournament.Teams}
        />
        <TournamentCreatorCard
          title="Creador del Torneo"
          user={tournament.User}
        />
      </div>
    </>
  );
}

export default Tournament;
