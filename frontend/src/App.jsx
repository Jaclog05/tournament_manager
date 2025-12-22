import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TournamentProvider } from './context/TournamentContext'
import Navigation from './components/layout/Navigation'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import MyTournaments from './pages/MyTournaments'
import TournamentLayout from './components/layout/TournamentLayout'
import Tournament from './pages/Tournament'
import TournamentTeams from './pages/TournamentTeams'
import TournamentStandings from './pages/TournamentStandings'
import TournamentPredictions from './pages/TournamentPredictions'
import ProtectedRoute from './components/layout/ProtectedRoute'
import TournamentMatches from './pages/TournamentMatches'

function App() {
  return (
    <AuthProvider>
      <TournamentProvider>
        <div className="App d-flex flex-column min-vh-100">
          <Navigation />
          <main className='flex-grow-1'>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/my-tournaments" element={<ProtectedRoute><MyTournaments /></ProtectedRoute>} />
              <Route
                path="/tournaments/:id"
                element={<ProtectedRoute><TournamentLayout /></ProtectedRoute>}
              >
                <Route index element={<Tournament/>}/>
                <Route path="teams" element={<TournamentTeams />} />
                <Route path="matches" element={<TournamentMatches />} />
                <Route path='standings' element={<TournamentStandings />} />
                <Route path='predictions' element={<TournamentPredictions />} />
              </Route>
            </Routes>
          </main>
        </div>
      </TournamentProvider>
    </AuthProvider>
  )
}

export default App