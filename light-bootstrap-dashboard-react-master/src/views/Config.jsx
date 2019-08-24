import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2V1kTY_s29wiorVqbbfhCo70dExD5w3E",
  authDomain: "nodemcu-3aeeb.firebaseapp.com",
  databaseURL: "https://nodemcu-3aeeb.firebaseio.com",
  projectId: "nodemcu-3aeeb",
  storageBucket: "nodemcu-3aeeb.appspot.com",
  messagingSenderId: "520980630441",
  appId: "1:520980630441:web:4fa91b9f9721c374"
};
// Initialize Firebase
const app1 = firebase.initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: "AIzaSyCmAFLK1Ez5Jm1s8qqsAYx_i7dv6DOcie8",
//   authDomain: "nodemcu-react.firebaseapp.com",
//   databaseURL: "https://nodemcu-react.firebaseio.com",
//   projectId: "nodemcu-react",
//   storageBucket: "nodemcu-react.appspot.com",
//   messagingSenderId: "234388979563",
//   appId: "1:234388979563:web:26b1f0b03fc10918"
//   // Initialize Firebase
// };
// const app1 = firebase.initializeApp(firebaseConfig);

export default app1;
