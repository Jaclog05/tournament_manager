import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useTournament } from "../../context/TournamentContext";
import TournamentHeader from "../TournamentHeader";

function TournamentLayout() {
  const { id } = useParams();
  const { loadTournament, tournament, loading, clearTournament } = useTournament();

  useEffect(() => {
    if(id){
      loadTournament(id);
    }
    return () => clearTournament();
  }, [id, loadTournament, clearTournament]);

  if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center">Cargando Torneo...</div>;
  if (!tournament) return <div>Torneo no encontrado</div>;

  return (
    <div
      className='vh-100 w-100 d-flex flex-column px-5 gap-3'
      style={{paddingTop: '75px'}}
    >
      <TournamentHeader
        tournamentName={tournament.name}
        startDate={tournament.startDate}
        endDate={tournament.endDate}
        status={tournament.status}
      />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  )
}

export default TournamentLayout