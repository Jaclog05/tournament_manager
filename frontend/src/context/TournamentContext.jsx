import React, {createContext, useState, useContext, useCallback} from 'react'
import { tournamentService } from '../services/api'

const TournamentContext = createContext();

export const useTournament = () => {
  return useContext(TournamentContext);
}

export const TournamentProvider = ({children}) => {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTournament = useCallback(async (id) => {
    if(tournament && tournament.id === parseInt(id)) return;

    setLoading(true);
    setError(null);
    try {
      const response = await tournamentService.getById(id);
      setTournament(response.data.tournament)
    } catch (error) {
      console.error("Error cargando torneo: ", error);
      setError(error.response?.data?.message || "Error al cargar el torneo");
      setTournament(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearTournament = useCallback(() => {
    setTournament(null);
    setError(null);
  }, []);

  const value = {
    tournament,
    loading,
    error,
    loadTournament,
    clearTournament
  }

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  )
}