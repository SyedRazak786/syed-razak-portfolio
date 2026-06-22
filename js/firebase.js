import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAsYJd5srsiepaqe8mmMqHMEhA5nC_ttjc",
  authDomain: "syed-razak-portfolio.firebaseapp.com",
  projectId: "syed-razak-portfolio",
  storageBucket: "syed-razak-portfolio.appspot.com",
  messagingSenderId: "835077281357",
  appId: "1:835077281357:web:78a18e1faea4f446f1ee04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore DB
const db = getFirestore(app);

// export db
export { db };