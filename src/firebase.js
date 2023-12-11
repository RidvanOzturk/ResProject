import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCZhw9TOBRmn-alcGA07RIcW3XP-xv5H6U",
  authDomain: "resapp-aa0c2.firebaseapp.com",
  projectId: "resapp-aa0c2",
  storageBucket: "resapp-aa0c2.appspot.com",
  messagingSenderId: "440487489754",
  appId: "1:440487489754:web:163fe265ecdf5fc60f35e3"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);