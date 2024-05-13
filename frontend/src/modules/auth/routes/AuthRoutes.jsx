import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
