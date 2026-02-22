import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJob from './pages/ManageJob'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const {showRecruiterLogin,companyToken} = useContext(AppContext)

  return (
    <>
    {showRecruiterLogin && <RecruiterLogin/>}
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/applications' element={<Applications/>}/>
      <Route path='/apply-job/:id' element={<ApplyJob/>}/>
      <Route path='/dashboard' element={<Dashboard/>}>
        {companyToken ? <>
          <Route path='add-job' element={<AddJob/>}/>
          <Route path='manage-jobs' element={<ManageJob/>}/>
          <Route path='view-applications' element={<ViewApplication/>}/>
        </>: <></>}
      </Route>
      
    </Routes>
    </>
  )
}

export default App
