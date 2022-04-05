
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth'; 

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

const db = getFirestore();

const storage = getStorage(app)

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

//Cerrar sesión del usuario
async function cerrarSesion() {
  await signOut(auth)
}

export {  auth, 
          db, 
          storage, 
          ref, 
          uploadBytesResumable, 
          getDownloadURL, 
          registrar, 
          login, 
          cerrarSesion 
};