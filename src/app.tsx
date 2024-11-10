import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { auth, provider, signInWithPopup, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AppRouter } from './components/app-router/app-router';
import { Navbar } from './components/nav-bar';
import { Loader } from './UI/loader';
import './App.css';

type FirebaseContextType = {
  auth: typeof auth;
  provider: typeof provider;
  signInWithPopup: typeof signInWithPopup;
  firestore: typeof firestore;
};

export const Context = createContext<FirebaseContextType | null>(null);

export const App = () => {
  const [, loading,] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Context.Provider value={{ auth, provider, signInWithPopup, firestore }}>
        <Navbar />
        <AppRouter />
      </Context.Provider>
    </BrowserRouter>
  );
};
