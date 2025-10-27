import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate('/dashboard')
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
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="text-primary">Iniciar Sesión</h2>
                <p className="text-muted">Accede a tu cuenta</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Tu contraseña"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100" 
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="text-muted">
                  ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login