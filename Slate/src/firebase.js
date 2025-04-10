import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjb-L6PDgr9cTG2dUBrzre7Dxfu9OA8jM",
  authDomain: "slate-4754c.firebaseapp.com",
  projectId: "slate-4754c",
  storageBucket: "slate-4754c.firebasestorage.app",
  messagingSenderId: "1065241635770",
  appId: "1:1065241635770:web:1953c1d0b8cecacd300b83",
  measurementId: "G-LN0EB3T6N9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
