import TeamCard from './cards/TeamCard';

function TeamList({teams}) {
  return (
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
  )
}

export default TeamList