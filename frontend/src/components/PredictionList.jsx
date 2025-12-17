import PredictionCard from "./cards/predictionCard/PredictionCard"

function PredictionList({predictions}) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      {predictions.map((match) => (
        <PredictionCard key={match.matchId} matchData={match} />
      ))}
    </div>
  )
}

export default PredictionList