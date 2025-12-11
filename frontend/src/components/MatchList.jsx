import MatchCard from "./cards/MatchCard"

function MatchList({ title, matches }) {
  return (
    <div className='col-md-4 border'>
      <div className='card border-0 shadow-sm'>
        <div className='card-body'>
          <h5 className='card-title fw-bold mb-3 text-center'>{title}</h5>
          <div className='d-flex flex-column gap-3'>
            {matches.length > 0 ? (
              matches.slice(0, 5).map(match => (
                <MatchCard key={match.id} matchData={match} />
              ))
            ) : (
              <p className="text-muted">No hay {title}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchList