import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify'
import Home from './componenets/Home'
import { useAuth } from './context/AuthContext'
import Signup from './componenets/signup'
import Login from './componenets/login'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const[authuser]=useAuth()
  

  return (
    <>


    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />


    </Routes>
    <ToastContainer/>
    </>

  )
}

export default App
