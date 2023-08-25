// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8yCvX4uLlQzwSdpRDQjxTg8TZKsyM0k8",
  authDomain: "mepstore-f56cd.firebaseapp.com",
  projectId: "mepstore-f56cd",
  storageBucket: "mepstore-f56cd.appspot.com",
  messagingSenderId: "892988790060",
  appId: "1:892988790060:web:9f24fe45daa08c074fc889",
  measurementId: "G-0YCJ410VPY"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase_app);

export default firebase_app;