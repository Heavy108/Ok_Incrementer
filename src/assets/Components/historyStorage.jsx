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
  const newHistoryRef = database.ref('histories').push(); // Generate a unique key for the new history entry
  newHistoryRef.set(history);
};


export const loadHistory = () => {
  return new Promise((resolve, reject) => {
    database.ref('histories').once('value', (snapshot) => {
      if (snapshot.exists()) {
        const historyData = snapshot.val();
        // Convert object to an array of objects
        const historyArray = Object.keys(historyData).map(key => ({
          id: key,
          count: historyData[key].count,
          date: historyData[key].date
        }));
        resolve(historyArray);
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
};
