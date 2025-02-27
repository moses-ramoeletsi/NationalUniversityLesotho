import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainContent from './pages/MainContent';
import Members from './pages/Members';
import LoginForm from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />

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
            </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
