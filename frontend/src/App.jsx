import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainContent from './pages/MainContent';
import Members from './pages/Members';
import LoginForm from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/Logout';
import Meetings from './pages/Meetings';
import Seminars from './pages/Seminars';
import AddSeminars from './components/AddSeminars';
import ActivitiesPage from './pages/ActivitiesPage';
import MentalHealthResourcePage from './pages/HealthCareResource';
import AddHealthCare from './components/AddHealthcare';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/seminars" element={<Seminars />} />
          <Route path="/health-care" element={<MentalHealthResourcePage />} />

        <Route path="/admin/*" element={<LoginForm />} />
          <Route path="/admin-panel/*" element={<AdminPanel />} />
          <Route path="/dashboard/*" element={<AdminPanel />} />

        <Route
            path="/members"
            element={
              <Layout>
                <Members />
              </Layout>
            }
            />
            <Route
            path="/activities"
            element={
              <Layout>
                <ActivitiesPage />
              </Layout>
            }
          />
            <Route
            path="/meetings"
            element={
              <Layout>
                <Meetings />
              </Layout>
            }
          />
          <Route path="/add-seminar" element={<AddSeminars />} />
          <Route path="/add-health-care" element={<AddHealthCare />} />
            </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
