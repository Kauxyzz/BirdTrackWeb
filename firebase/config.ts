import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyCkHvFhzw8h7PsvhX9DShT10snbw15FzrE",
  authDomain: "gestaoavicola.firebaseapp.com",
  projectId: "gestaoavicola",
  storageBucket: "gestaoavicola.appspot.com",
  messagingSenderId: "539147228546",
  appId: "1:539147228546:web:6544e2c0f2f8322e78ab9b",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
