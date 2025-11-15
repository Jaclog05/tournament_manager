import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/layout/Navigation'
import Login from './pages/Auth/Login'

function App() {
  return (
    <AuthProvider>
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />
        <main className='flex-grow-1'>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App