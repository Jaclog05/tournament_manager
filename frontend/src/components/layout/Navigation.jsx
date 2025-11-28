import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navigation = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if(['/login', '/register'].includes(location.pathname)) return null

  const getFirstName = (fullName = "") => fullName.split(" ")[0];

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
        <Nav variant="pills" defaultActiveKey="/dashboard" style={{fontSize: '12px'}}>
          <Nav.Item>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="my-tournaments">Mis Torneos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings">
              Configuration
            </Nav.Link>
          </Nav.Item>
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