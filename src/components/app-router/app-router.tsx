import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { publicRoutes, privateRoutes } from '../../config/routes/routes';
import { Context } from '../../app';

export const AppRouter = () => {
  const { auth } = useContext(Context)!;
  const [user] = useAuthState(auth);

  return (
    <Routes>
      {user
        ? privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))
        : publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
      <Route
        path="*"
        element={<Navigate to={user ? '/chat' : '/login'} replace />}
      />
    </Routes>
  );
};