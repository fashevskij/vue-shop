import firebase from '@firebase/app';
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyBnswX-B0yis10gDearR4zJFrwxgRQu_yY",
  authDomain: "realtime-database-e4ca0.firebaseapp.com",
  databaseURL:
    "https://realtime-database-e4ca0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "realtime-database-e4ca0",
  storageBucket: "realtime-database-e4ca0.appspot.com",
  messagingSenderId: "392815086971",
  appId: "1:392815086971:web:072a67208680622aef81de",
  measurementId: "G-7RPFSLZH9C"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const productsRef = db.ref("products");



