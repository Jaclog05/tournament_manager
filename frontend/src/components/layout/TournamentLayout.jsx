import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { tournamentService } from "../../services/api";
import TournamentHeader from "../TournamentHeader";

function TournamentLayout() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        const response = await tournamentService.getById(id);
        const data = await response.data.tournament;
        setTournament(data);
      } catch (error) {
        console.error("No se pudo obtener la información base del torneo", error);
      } finally {
        setLoading(false)
      }
    };

    fetchBaseData();
  }, [id]);

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
        <Outlet context={{tournament, id}} />
      </div>
    </div>
  )
}

export default TournamentLayout