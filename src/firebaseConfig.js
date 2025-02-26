import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoQuoNYCEEAB6QMtu4zzX3k222FwYIhp8",
  authDomain: "gamerzoneapp-49b95.firebaseapp.com",
  projectId: "gamerzoneapp-49b95",
  storageBucket: "gamerzoneapp-49b95.firebasestorage.app",
  messagingSenderId: "953698137613",
  appId: "1:953698137613:web:b1cd34a4dee3dbf5370744",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
