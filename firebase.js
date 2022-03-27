
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'

import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'; 

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

//Registrar usuario
async function registrar({nombre,email,password}) {
  await createUserWithEmailAndPassword(auth, email, password )
  await updateProfile(auth.currentUser,{
     displayName: nombre
 })
}

//Iniciar sesion del usuario
async function login({email,password}) {
  return await signInWithEmailAndPassword(auth, email, password)
}

export { registrar, login };