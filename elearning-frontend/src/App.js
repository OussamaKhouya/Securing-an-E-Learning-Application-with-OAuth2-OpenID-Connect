import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoursesPage from './CoursesPage';
import AdminCoursesPage from './AdminCoursesPage';
import ProtectedRoute from './ProtectedRoute';
import ProfileBar from './ProfileBar';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-shell">
          <ProfileBar />
          <nav className="main-nav">
            <Link className="nav-link" to="/courses">
              Cours
            </Link>
            <ProtectedRoute roles={['ROLE_ADMIN']}>
            <Link className="nav-link" to="/admin/courses">
              Admin Cours
            </Link>
              </ProtectedRoute>
          </nav>
          <div className="page-content">
            <Routes>
              <Route path="/" element={<CoursesPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute roles={['ROLE_ADMIN']}>
                    <AdminCoursesPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
