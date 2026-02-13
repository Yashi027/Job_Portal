import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'

function App() {
  const {showRecruiterLogin} = useContext(AppContext)

  return (
    <>
    {showRecruiterLogin && <RecruiterLogin/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/applications' element={<Applications/>}/>
      <Route path='/apply-job/:id' element={<ApplyJob/>}/>
    </Routes>
    </>
  )
}

export default App
