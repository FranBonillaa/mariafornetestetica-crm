import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Clients from './pages/Clients';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/' element={<div>Dashboard</div>} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/collaborations' element={<div>Colaboraciones</div>} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App