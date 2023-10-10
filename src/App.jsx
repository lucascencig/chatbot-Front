import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './Components/Login/Login'
import Chat from './Components/Layout/Chat'

function App() {


  return (

    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path="/online-chat" element={<Chat />} />
        </Routes>
      </Router>

    </div>
  )

}

export default App