import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDd52nL7LKW_IzkUSBUI02xLUs6w1hRFB0",
  authDomain: "kasmudamudi.firebaseapp.com",
  projectId: "kasmudamudi",
  storageBucket: "kasmudamudi.firebasestorage.app",
  messagingSenderId: "330903620838",
  appId: "1:330903620838:web:537d9a3c0becc983d03f27",
  measurementId: "G-DW3HBHKRQY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
