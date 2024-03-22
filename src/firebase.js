import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
import {getFirestore} from "@firebase/firestore";

const envKeys = import.meta.env

const firebaseConfig = {
  apiKey: envKeys.VITE_APP_FIREBASE_API_KEY,
  authDomain: envKeys.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: envKeys.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: envKeys.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envKeys.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: envKeys.VITE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);