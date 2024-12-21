// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHB8rH0WEzbntHTjKmN30qc1B5p8bZcxU",
  authDomain: "e-star-commerce.firebaseapp.com",
  projectId: "e-star-commerce",
  storageBucket: "e-star-commerce.firebasestorage.app",
  messagingSenderId: "207792424741",
  appId: "1:207792424741:web:d12e6a0823f0513c797ccc",
  measurementId: "G-Y101K8G1SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);