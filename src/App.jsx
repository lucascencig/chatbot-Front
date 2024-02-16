import React from 'react';

import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout';

function App() {


  return (
    <div className=''>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/chat" element={<MainLayout />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;