
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1cKrZef_t40TK-48t4oIYghSgqCie1bI",
  authDomain: "nba-image-gallery.firebaseapp.com",
  projectId: "nba-image-gallery",
  storageBucket: "nba-image-gallery.appspot.com",
  messagingSenderId: "1098106403481",
  appId: "1:1098106403481:web:3451089fbcbd2f28a29608"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);