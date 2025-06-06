
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from './providers/QueryProvider';
import Layout from './components/Layout';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <QueryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
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
