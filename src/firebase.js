import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrRmOTZkBpI_nnksZO3mlL45edgty17GE",
  authDomain: "classic-barbershop-636b2.firebaseapp.com",
  projectId: "classic-barbershop-636b2",
  storageBucket: "classic-barbershop-636b2.firebasestorage.app",
  messagingSenderId: "207742509831",
  appId: "1:207742509831:web:da99780cd754db9a4d9ba2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;