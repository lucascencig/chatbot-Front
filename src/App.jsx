import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Chat from '../src/Components/Layout/Chat'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/online-chat' element={<Chat />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App