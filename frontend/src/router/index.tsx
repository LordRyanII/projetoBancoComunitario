import { Routes, Route } from 'react-router-dom';
import InterfaceSaudacao from '../components/pages/saudacao';
import Login from '../components/pages/login/Login';
import Home from '../components/pages/home';
import ProtectedRoute from './protectedRoutes';
import NotFoundPage from '../components/pages/404';
import RegisterSection from '../components/pages/register/Register';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<InterfaceSaudacao />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={<ProtectedRoute>{<Home />}</ProtectedRoute>}
      />
      <Route path="*" element={<NotFoundPage/>}/>
      <Route path="/form/cadastrouser" element={<RegisterSection/>}/>
    </Routes>
  );
}
