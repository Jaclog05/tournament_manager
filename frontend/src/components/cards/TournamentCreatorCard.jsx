function TournamentCreatorCard({title, user}) {
  return (
    <div className='col-md-4 border'>
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center">
          <h6 className="fw-bold">{title}</h6>
          <p className="mb-0">{user.name}</p>
          <small className="text-muted">{user.email}</small>
        </div>
      </div>
    </div>
  )
}

export default TournamentCreatorCard