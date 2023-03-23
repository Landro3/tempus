import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGetClientsQuery, useGetTimeQuery } from './redux/api';
import PageLayout from './components/PageLayout';
import Home from './pages/home';
import Clients from './pages/clients';
import Reports from './pages/reports';
import Invoice from './pages/invoice';

const App = () => {
  useGetTimeQuery();
  useGetClientsQuery();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route element={<Home />} index />
          <Route path="/clients" element={<Clients />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/invoice" element={<Invoice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
