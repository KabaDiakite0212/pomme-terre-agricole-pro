
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Surfaces from './components/Surfaces';
import Fields from './components/Fields';
import Inputs from './components/Inputs';
import Clients from './components/Clients';
import Sales from './components/Sales';
import Harvests from './components/Harvests';
import Equipment from './components/Equipment';
import Conservation from './components/Conservation';
import Conseils from './components/Conseils';
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
              <Route path="/surfaces" element={<Surfaces />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/harvests" element={<Harvests />} />
              <Route path="/inputs" element={<Inputs />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/conservation" element={<Conservation />} />
              <Route path="/conseils" element={<Conseils />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/sales" element={<Sales />} />
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
