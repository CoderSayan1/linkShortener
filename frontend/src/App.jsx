import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import './input.css'
import {ToastContainer} from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer 
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition: Bounce
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
