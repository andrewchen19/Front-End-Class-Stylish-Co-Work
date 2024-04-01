import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN_5Pg_5Md5VvcY3yL8obO-3s3HraY5n0",
  authDomain: "stylish-94868.firebaseapp.com",
  projectId: "stylish-94868",
  storageBucket: "stylish-94868.appspot.com",
  messagingSenderId: "87830176996",
  appId: "1:87830176996:web:d66d379ff618eff3f9f8f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
