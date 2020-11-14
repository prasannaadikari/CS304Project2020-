import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
/*const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "SERVICE-firebase",
  storageBucket: "SERVICE-firebase.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx",
};*/
let config = {
  apiKey: "xxx",
  authDomain: "bezkoder-firebase.firebaseapp.com",
  databaseURL: "https://bezkoder-firebase.firebaseio.com",
  projectId: "bezkoder-firebase",
  storageBucket: "bezkoder-firebase.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx",
};
firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export default firebase.database();