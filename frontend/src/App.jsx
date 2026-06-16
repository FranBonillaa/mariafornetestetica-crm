import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Clients from './pages/Clients';
import Collaborations from './pages/Collaborations';
import ClientForm from './pages/ClientForm';
import CollaborationForm from './pages/CollaborationForm';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/clients' element={<PrivateRoute><Clients /></PrivateRoute>} />
          <Route path='/clients/new' element={<PrivateRoute><ClientForm /></PrivateRoute>} />
          <Route path='/collaborations' element={<PrivateRoute><Collaborations /></PrivateRoute>} />
          <Route path='/collaborations/new' element={<PrivateRoute><CollaborationForm /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App