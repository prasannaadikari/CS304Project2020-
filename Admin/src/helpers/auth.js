import { auth } from "../services/firebase";



export function signin(password) {
  return auth().signInWithEmailAndPassword("prasannaadikari11@gmail.com", password);
}

export function logout() {
  return auth().signOut();
}

export function doPasswordReset(email) {
  return auth().sendPasswordResetEmail(email);
}