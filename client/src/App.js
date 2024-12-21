import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Define routes for other pages (e.g., Car Details, Login, Signup) */}
      </Routes>
      {/* You can include a footer here */}
    </Router>
  );
}

export default App;
