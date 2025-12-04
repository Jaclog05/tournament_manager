import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TournamentCard from "../../src/components/cards/TournamentCard";
import { tournamentService } from "../services/api";

function MyTournaments() {
  const [activeTournaments, setActiveTournaments] = useState([]);
  const [finishedTournaments, setFinishedTournaments] = useState([]);

  useEffect(() => {
    const fetchAllTournaments = async () => {
      try {
        const response = await tournamentService.getAll();
        const myTournamentsData = await response.data;

        const active = myTournamentsData.tournaments.filter(
          (tournament) => tournament.status === "pending"
        ); // TODO cambiar 'pending' por 'active'
        const finished = myTournamentsData.tournaments.filter(
          (tournament) => tournament.status === "finished"
        );

        setActiveTournaments(active);
        setFinishedTournaments(finished);
      } catch (error) {
        console.error("Error fetching my tournaments ", error);
      }
    };

    fetchAllTournaments();
  }, []);

  return (
    <div
      className="vh-100 w-100 d-flex flex-column px-5 gap-3"
      style={{ paddingTop: "75px" }}
    >
      <div id="section" className="p-3">
        <h3 style={{ fontSize: "24px" }}>Torneos Activos</h3>
        <div
          id="cards-container"
          className="d-flex flex-row align-items-stretch flex-wrap"
          style={{ height: "120px", gap: "1rem" }}
        >
          {activeTournaments.length > 0 ? (
            activeTournaments.map((tournament) => (
              <Link
                key={tournament}
                to={`/tournaments/${tournament.id}`}
                style={{ textDecoration: "none" }}
              >
                <TournamentCard
                  tournamentName={tournament.name}
                  teamsAmount={tournament.Teams.length}
                />
              </Link>
            ))
          ) : (
            <p>No tienes torneos activos</p>
          )}
        </div>
      </div>

      <hr />

      <div id="section" className="p-3">
        <h3 style={{ fontSize: "24px" }}>Torneos Finalizados</h3>
        <div
          id="cards-container"
          className="d-flex flex-row align-items-stretch flex-wrap"
          style={{ gap: "1rem" }}
        >
          {finishedTournaments.length > 0 ? (
            finishedTournaments.map((tournament) => (
              <Link
                key={tournament.id}
                to={`/tournaments/${tournament.id}`}
                style={{ textDecoration: "none" }}
              >
                <TournamentCard
                  tournamentName={tournament.name}
                  teamsAmount={tournament.Teams.length}
                />
              </Link>
            ))
          ) : (
            <p>Aún no tienes torneos finalizados</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTournaments;
