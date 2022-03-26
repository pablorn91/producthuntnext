
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBOetHKriT-3kdcdnWREv4Cgj1PPOenVb4",
  authDomain: "product-hunt-8b207.firebaseapp.com",
  projectId: "product-hunt-8b207",
  storageBucket: "product-hunt-8b207.appspot.com",
  messagingSenderId: "844854052747",
  appId: "1:844854052747:web:e392bf4a93bdee64db118e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };