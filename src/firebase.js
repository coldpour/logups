import * as firebase from "firebase/app";
import "firebase/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCLBTItBH-_kUm4zBWsCtNQvmmePJa3kLw",
  authDomain: "logups-dbc17.firebaseapp.com",
  databaseURL: "https://logups-dbc17.firebaseio.com",
  projectId: "logups-dbc17",
  storageBucket: "logups-dbc17.appspot.com",
  messagingSenderId: "551311844214",
  appId: "1:551311844214:web:7f1e53ac3454f7c2d61057",
  measurementId: "G-HM57NVP9BZ",
});

firebase.analytics();

export default app;
