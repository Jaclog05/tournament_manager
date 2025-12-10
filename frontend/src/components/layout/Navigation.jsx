import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navigation = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if(['/login', '/register'].includes(location.pathname)) return null

  const tournamentMatch = matchPath('/tournaments/:id/*', location.pathname)
  const isTournamentMode = !!tournamentMatch;
  const tournamentId = tournamentMatch?.params?.id;

  const getFirstName = (fullName = "") => fullName.split(" ")[0];

  const tournamentName = "Liga Amateur 2024"; /* TODO: Fetch tournament name based on tournamentId */

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar fixed="top" bg="light" data-bs-theme="light">
      <Container className='gap-3'>
        <LinkContainer to="/dashboard" style={{fontSize: '16px', fontWeight: 'bold'}}>
          <Navbar.Brand>
            <img
              src="/main-logo.svg"
              alt="Tournament Manager Logo"
              width="25px"
              style={{marginRight: "1rem"}}
            />
            MyTournamentApp
          </Navbar.Brand>
        </LinkContainer>
        <Nav variant="pills" className='me-auto' style={{fontSize: '12px', alignItems: 'center'}}>
          {isTournamentMode ? (
            <>
              <Navbar.Text className="fw-bold text-dark me-3 d-none d-lg-block" style={{ borderRight: "1px solid #ccc", paddingRight: "15px"}}>
                {tournamentName}
              </Navbar.Text>
              <LinkContainer to={`/tournaments/${tournamentId}`} end>
                <Nav.Link>Resumen</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/tournaments/${tournamentId}/teams`}>
                <Nav.Link>Equipos</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/tournaments/${tournamentId}/matches`}>
                <Nav.Link>Partidos</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/tournaments/${tournamentId}/standings`}>
                <Nav.Link>Tabla</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/tournaments/${tournamentId}/predictions`}>
                <Nav.Link>Predicciones</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to={`dashboard`}>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/my-tournaments`}>
                <Nav.Link>Mis Torneos</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/settings`}>
                <Nav.Link>Configuracion</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={`${user ? getFirstName(user.name) : 'Account'}`} id="basic-nav-dropdown" align="end">
            <NavDropdown.Item href='/profile'>Perfil de Usuario</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
          </NavDropdown>
          <img
            src="/user-logo.svg"
            alt="User Logo"
            width="25px"
            style={{marginLeft: "0.5rem"}}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation