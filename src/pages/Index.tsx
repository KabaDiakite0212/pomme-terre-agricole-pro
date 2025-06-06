
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Surfaces from '@/components/Surfaces';
import Fields from '@/components/Fields';
import Inputs from '@/components/Inputs';
import Clients from '@/components/Clients';
import Sales from '@/components/Sales';
import Harvests from '@/components/Harvests';
import Equipment from '@/components/Equipment';
import Profile from '@/components/Profile';
import Investments from '@/components/Investments';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/surfaces" element={<Surfaces />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/harvests" element={<Harvests />} />
        <Route path="/inputs" element={<Inputs />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default Index;
