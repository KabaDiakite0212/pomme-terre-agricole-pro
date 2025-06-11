
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Fields from './components/Fields';
import Surfaces from './components/Surfaces';
import Harvests from './components/Harvests';
import Sales from './components/Sales';
import Conservation from './components/Conservation';
import Inputs from './components/Inputs';
import Equipment from './components/Equipment';
import Clients from './components/Clients';
import Investments from './components/Investments';
import Conseils from './components/Conseils';
import Settings from './components/Settings';
import Profile from './components/Profile';
import { QueryProvider } from './providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/surfaces" element={<Surfaces />} />
              <Route path="/harvests" element={<Harvests />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/conservation" element={<Conservation />} />
              <Route path="/inputs" element={<Inputs />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/conseils" element={<Conseils />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </QueryProvider>
  );
}

export default App;
