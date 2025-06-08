
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './common/providers/QueryProvider';
import Layout from './common/components/Layout/Layout';
import Dashboard from './components/Dashboard';
import SurfacesPage from './modules/surfaces/components/SurfacesPage';
import Fields from './components/Fields';
import Inputs from './components/Inputs';
import ClientsPage from './modules/clients/components/ClientsPage';
import SalesPage from './modules/sales/components/SalesPage';
import Harvests from './components/Harvests';
import Equipment from './components/Equipment';
import Profile from './components/Profile';
import Investments from './components/Investments';
import Settings from './components/Settings';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <QueryProvider>
      <Router>
        <div className="min-h-screen w-full bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/surfaces" element={<SurfacesPage />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/harvests" element={<Harvests />} />
              <Route path="/inputs" element={<Inputs />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </QueryProvider>
  );
}

export default App;
