
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Surfaces from '@/components/Surfaces';
import Fields from '@/components/Fields';
import Inputs from '@/components/Inputs';
import Clients from '@/components/Clients';
import Sales from '@/components/Sales';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/surfaces" element={<Surfaces />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/inputs" element={<Inputs />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </Layout>
  );
};

export default Index;
