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
import EducationalTrip from './pages/EducationalTrips';
import AddTrip from './components/AddTrip';
import AnnualDebatesPage from './pages/Debates';
import AddDebate from './components/AddDebate';
import Partnership from './pages/Collaboration';
import AddCollaborator from './components/AddCollaborator';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/seminars" element={<Seminars />} />
          <Route path="/health-care" element={<MentalHealthResourcePage />} />
          <Route path="/educational-trip" element={<EducationalTrip />} />
          <Route path="/annual-debates" element={<AnnualDebatesPage />} />
          <Route path="/collaboration" element={<Partnership />} />

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
          <Route path="/add-educational-trips" element={<AddTrip />} />
          <Route path="/add-annual-debate" element={<AddDebate />} />
          <Route path="/add-collaborator" element={<AddCollaborator />} />
            </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
