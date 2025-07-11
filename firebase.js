// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1dZTmQnk0B4UothVhtHiPT5Fnz591MD0",
  authDomain: "digibox-market.firebaseapp.com",
  projectId: "digibox-market",
  storageBucket: "digibox-market.firebasestorage.app",
  messagingSenderId: "371742048815",
  appId: "1:371742048815:web:ceb844e8400b7578e0bcda",
  measurementId: "G-D9HLP4PWS5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
