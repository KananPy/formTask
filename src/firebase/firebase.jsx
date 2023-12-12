
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB7HFGho5T_iH49GGTh4gW4dmEl9HRZwKc",
  authDomain: "formtask-7c8d0.firebaseapp.com",
  projectId: "formtask-7c8d0",
  storageBucket: "formtask-7c8d0.appspot.com",
  messagingSenderId: "23362567252",
  appId: "1:23362567252:web:2efacc57bbc9087c6741c1"
};

const app = initializeApp(firebaseConfig);

export default app