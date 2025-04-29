import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomeContainer from './HomeContainer/HomeContainer.jsx'
import UsersContainer from './UsersContainer/UsersContainer.jsx'
import UserScheduleContainer from './UserScheduleContainer/UserScheduleContainer.jsx'

function App() {



  return (
    <div>
    <main className='App'>
      <header>
        <h1>Jammer</h1>
      </header>
      <Routes>
        <Route path="/" element={<HomeContainer />}/>
        <Route path="/users" element={<UsersContainer />}/>
        <Route path="/users/:id/schedules" element={<UserScheduleContainer />}/>
      </Routes>
    </main>
    </div>
  )
}

export default App
