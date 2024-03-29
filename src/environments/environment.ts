import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

// export const environment = {
//   production: false,
//   firebase: {
//     projectId: 'lccc-951e9',
//     appId: '1:490603146752:web:9667961e622f67770172e5',
//     databaseURL: 'https://lccc-951e9-default-rtdb.firebaseio.com',
//     storageBucket: 'lccc-951e9.appspot.com',
//     apiKey: 'AIzaSyB7ZIv9yI955npmzc5MSarDB4OJ75aM5p8',
//     authDomain: 'lccc-951e9.firebaseapp.com',
//     messagingSenderId: '490603146752',
//     measurementId: 'G-TEPQ8F3KYQ',
//   }
// };

export const environment = {
  production: false,
  firebase: {
    projectId: 'lccc-951e9',
    appId: '1:490603146752:web:9667961e622f67770172e5',
    databaseURL: 'https://lccc-951e9-default-rtdb.firebaseio.com',
    storageBucket: 'lccc-951e9.appspot.com',
    apiKey: 'AIzaSyB7ZIv9yI955npmzc5MSarDB4OJ75aM5p8',
    authDomain: 'lccc-951e9.firebaseapp.com',
    messagingSenderId: '490603146752',
    measurementId: 'G-TEPQ8F3KYQ',
  }
};

// Initialize Firebase
export const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
const db = getFirestore(app);

