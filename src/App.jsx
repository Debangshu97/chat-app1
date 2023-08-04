import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import PrivateRoutes from "./components/PrivateRoutes"
import { AuthProvider } from './utils/AuthContext'

import './App.css'
import Room from './pages/Room'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  

  return (
    <Router>
      <AuthProvider>

      
    <Routes>
     

<Route  element={<PrivateRoutes/>}>
     <Route path='/' element={<Room/>}/>
</Route>

<Route path='/login' element={<LoginPage/>}/>
<Route path='/register' element={<RegisterPage/>}/>
    </Routes>
   </AuthProvider>
    </Router>
  )
}

export default App
