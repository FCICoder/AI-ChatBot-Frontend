import './App.css'
import Header from './component/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Notfound from './pages/Notfound'
import React, { useContext } from 'react'
import { authContext } from './Context/AuthContext'
import Footer from './component/Footer/Footer'
function App() {
  const auth = useContext(authContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {auth?.isLoggedIn && auth?.user && <Route path='/chat' element={<Chat />} />}
        <Route path='*' element={<Notfound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
