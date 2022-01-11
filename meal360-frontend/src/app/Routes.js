import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}