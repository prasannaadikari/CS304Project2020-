import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "SERVICE-firebase",
  storageBucket: "SERVICE-firebase.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export default firebase.database();