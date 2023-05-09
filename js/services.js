// import firebase libraries
import firebaseConfig from "./firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// init services
const db = getFirestore();
const auth = getAuth();

// collection refs
const colRef = collection(db, "users");

// logining in

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("signed");
      window.location.pathname = "/intership-master/Career-Center.html";
    })
    .catch((err) => {
      console.log(err.message);
    });
});
