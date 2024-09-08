import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9S7cYk1tZznSFxbsG2vtnuas4Z7JP_qU",
    authDomain: "kanban-board-81b30.firebaseapp.com",
    projectId: "kanban-board-81b30",
    storageBucket: "kanban-board-81b30.appspot.com",
    messagingSenderId: "384754130456",
    appId: "1:384754130456:web:10e55b78615ebee67e2d6d",
    measurementId: "G-G5GFKXZ2D6"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
