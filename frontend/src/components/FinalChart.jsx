import MatchCard from "./cards/MatchCard"

function FinalChart({finalStageMatches}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 auto', gap: '1rem' }}>
      {finalStageMatches.length > 0 ? (
        finalStageMatches.map(match => (
          <MatchCard key={match.id} matchData={match} />
        ))
      ):(
        <p>No hay partidos creados en esta fase</p>
      )}
    </div>
  )
}

export default FinalChart