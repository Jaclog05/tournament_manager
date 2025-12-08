import './StandingsTable.css';

const StandingsTable = ({ data }) => {

  if (!data || !data.standings) {
    return <div className="loading">Cargando tabla...</div>;
  }

  const { standings } = data;

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="standings-table">
          <thead>
            <tr>
              <th title="Posición">#</th>
              <th className="text-left">Equipo</th>
              <th title="Partidos Jugados">PJ</th>
              <th title="Ganados">G</th>
              <th title="Empatados">E</th>
              <th title="Perdidos">P</th>
              <th title="Goles a Favor" className="hide-mobile">GF</th>
              <th title="Goles en Contra" className="hide-mobile">GC</th>
              <th title="Diferencia de Goles">DG</th>
              <th title="Puntos">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.teamId} className={`pos-${row.position}`}>
                <td className="position-cell">
                  <span className="rank">{row.position}</span>
                </td>
                <td className="team-cell text-left">
                  <span className="team-name">{row.teamName}</span>
                </td>
                <td>{row.matchesPlayed}</td>
                <td>{row.wins}</td>
                <td>{row.draws}</td>
                <td>{row.losses}</td>
                <td className="hide-mobile">{row.goalsFor}</td>
                <td className="hide-mobile">{row.goalsAgainst}</td>
                <td className={`diff-cell ${row.goalDifference > 0 ? 'positive' : row.goalDifference < 0 ? 'negative' : ''}`}>
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="points-cell">
                  <strong>{row.points}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsTable;