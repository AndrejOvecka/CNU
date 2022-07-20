import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './components/Layout';
import { Routes } from './Routes';

export function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
      <ToastContainer theme="colored" hideProgressBar />
    </Router>
  );
}
