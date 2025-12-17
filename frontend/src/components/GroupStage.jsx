import MatchCard from "./cards/MatchCard"

function GroupStage({groupStageMatches}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 auto', gap: '1rem' }}>
      {groupStageMatches.length > 0 ? (
        groupStageMatches.map(match => (
          <MatchCard key={match.id} matchData={match} />
        ))
      ):(
        <p>No hay partidos creados en esta fase</p>
      )}
    </div>
  )
}

export default GroupStage