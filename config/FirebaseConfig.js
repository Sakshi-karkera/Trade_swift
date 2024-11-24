// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "trade-swift.firebaseapp.com",
  projectId: "trade-swift",
  storageBucket: "trade-swift.appspot.com",
  messagingSenderId: "72444451247",
  appId: "1:72444451247:web:f4e9ad5eef16ed597ab75a",
  measurementId: "G-MRG4HQCNGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);
//const analytics = getAnalytics(app);