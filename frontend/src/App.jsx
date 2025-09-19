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
import CallPage from './componenets/CallPage'
import ChatPage from './componenets/ChatPage'
import Notification from './componenets/Notification'
import Onboarding from './componenets/Onboarding'
import { Query, QueryClient, useQuery } from '@tanstack/react-query'

function App() {
 
  const[authuser]=useAuth()
 

  


  return (
    <>


    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />

      <Route path="/login" element={<Login/>} />
      <Route path="/call" element={<CallPage/>} />
      <Route path="/chat" element={<ChatPage/>} />
      <Route path="/notification" element={<Notification/>} />
      <Route path="/onboarding" element={<Onboarding/>} />


    </Routes>
    <ToastContainer/>
    </>

  )
}

export default App
