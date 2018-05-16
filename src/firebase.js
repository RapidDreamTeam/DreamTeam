import firebase from "firebase";
const config = {
  apiKey: "AIzaSyDmicnjGkCExMoie5qH2DkdwySGwMAByhY",
  authDomain: "dreamteamhackathon.firebaseapp.com",
  databaseURL: "https://dreamteamhackathon.firebaseio.com",
  projectId: "dreamteamhackathon",
  storageBucket: "dreamteamhackathon.appspot.com",
  messagingSenderId: "274005184416"
};
firebase.initializeApp(config);

export default firebase;
export const db = firebase.database;
export const auth = firebase.auth;
