import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Register() {

  const [ formData, setFormData ] = useState({ email: '', password: '', name: ''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await register(formData.email, formData.password, formData.name)

    if (result.success) {
      navigate('/login')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  return (
    <Container className='vh-100'>
      <Row className="vh-100 justify-content-center align-items-center">
        <Col md={5} lg={4}>
          <Card className="shadow">
            <Card.Body className="d-flex flex-column">
              {error && <Alert variant="danger">{error}</Alert>}
              <img
                src="/main-logo.svg"
                alt="Tournament Manager Logo"
                width="120px"
                style={{margin: "0 auto"}}
              />

              <Form
                onSubmit={handleSubmit}
                style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nombre..."
                />

                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Correo electrónico..."
                />

                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Contraseña..."
                />

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100" 
                  disabled={loading}
                >
                  {loading ? 'Creando cuenta...' : 'Registrarse'}
                </Button>
              </Form>

              <div className="text-center my-2">
                <p className="text-muted mb-0">
                  ¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register