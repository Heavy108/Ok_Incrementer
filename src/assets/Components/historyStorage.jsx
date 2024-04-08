import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDOTUidxXldp1bN64BkXCSVKdJp9MZHFZI",
  authDomain: "okinc-1aba4.firebaseapp.com",
  projectId: "okinc-1aba4",
  storageBucket: "okinc-1aba4.appspot.com",
  messagingSenderId: "660256372295",
  appId: "1:660256372295:web:d8808ab04bdea2036ae362",
  measurementId: "G-2SF84NVJT4"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export const saveHistory = (history) => {
  database.ref('histories').set(history);
};

export const loadHistory = () => {
  return new Promise((resolve, reject) => {
    database.ref('histories').once('value', (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
};