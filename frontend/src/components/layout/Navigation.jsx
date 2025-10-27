import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../../context/AuthContext'

const Navigation = () => {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="bi bi-trophy-fill me-2"></i>
            Tournament Manager
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          
          <Nav>
            {user ? (
              <NavDropdown title={user.name} id="user-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Perfil</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Iniciar Sesión</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Registrarse</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation