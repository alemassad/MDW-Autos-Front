import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqZn_68S1ItlEgjudhIqBs80HKnFJ_z - A",
  authDomain: "automotores-mdw.firebaseapp.com",
  projectId: "automotores-mdw",
  storageBucket: "automotores-mdw.firebasestorage.app",
  messagingSenderId: "1065656684147",
  appId: "1:1065656684147:web:73ad3e62729e43cd456406",
};
/* VITE_FIREBASE_API_KEY=AIzaSyBqZn_68S1ItlEgjudhIqBs80HKnFJ_z-A
VITE_FIREBASE_AUTH_DOMAIN=automotores-mdw.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=automotores-mdw
VITE_FIREBASE_STORAGE_BUCKET=automotores-mdw.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1065656684147
VITE_FIREBASE_APP_ID=1:1065656684147:web:73ad3e62729e43cd456406 */
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);