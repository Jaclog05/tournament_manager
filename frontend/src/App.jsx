import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/layout/Navigation'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import MyTournaments from './pages/MyTournaments'
import Tournament from './pages/Tournament'
import TournamentTeams from './pages/TournamentTeams'
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />
        <main className='flex-grow-1'>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/my-tournaments" element={<ProtectedRoute><MyTournaments /></ProtectedRoute>} />
            <Route path="/tournaments/:id" element={<ProtectedRoute><Tournament /></ProtectedRoute>} />
            <Route path="/tournaments/:id/teams" element={<ProtectedRoute><TournamentTeams /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App