import formatDateTime from "../utils/dateFormatter"

function TournamentHeader({name, startDate, endDate, status}) {
  return (
    <div className='mb-4 d-flex flex-column align-items-center gap-2'>
      <h1 className='fw-bold text-center'>{name}</h1>
      <div className='d-flex align-items-center justify-content-center gap-2'>
        <span className='text-muted'>
          {formatDateTime(startDate)} - {formatDateTime(endDate)}
        </span>
      </div>
      <span className='badge bg-success text-center'>{status}</span>
    </div>
  )
}

export default TournamentHeader