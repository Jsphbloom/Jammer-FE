import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomeContainer from './HomeContainer/HomeContainer.jsx'
import UsersContainer from './UsersContainer/UsersContainer.jsx'
import UserScheduleContainer from './UserScheduleContainer/UserScheduleContainer.jsx'
import SchedulesPage from './SchedulesPage/SchedulesPage.jsx'

function App() {



  return (
    <div>
      <header>
        <h1>Jammer</h1>
      </header>
    <main className='App'>
      <Routes>
        <Route path="/" element={<HomeContainer />}/>
        <Route path="/users" element={<UsersContainer />}/>
        <Route path="/users/:id/schedules" element={<UserScheduleContainer />}/>
        <Route path="/schedules" element={<SchedulesPage />} />
      </Routes>
    </main>
    </div>
  )
}

export default App
