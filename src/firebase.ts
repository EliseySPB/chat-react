import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyDq4vWhVH1x0tBpHWNHKSoJPBwOTrPHvLA',
  authDomain: 'chat-react-79cc5.firebaseapp.com',
  projectId: 'chat-react-79cc5',
  storageBucket: 'chat-react-79cc5.firebasestorage.app',
  messagingSenderId: '321108375909',
  appId: '1:321108375909:web:29062d266c85c88cfe898c',
  measurementId: 'G-CFX97CRMBN',
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); //take google init
const firestore = getFirestore(app);

export { auth, provider, signInWithPopup, firestore };
