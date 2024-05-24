import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

import './App.css';
import RankingPage from './pages/RankingPage';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
