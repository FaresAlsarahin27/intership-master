// import firebase libraries
import firebaseConfig from "./firebaseConfig";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// init services
const db = getFirestore();
const auth = getAuth();

// collection refs
const usersCollection = collection(db, "users");

// logining in
try {
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {

      const qEmail = query(usersCollection, where("email", "==", email));
      getDocs(qEmail)
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const userType = querySnapshot.docs[0].data().userType;
          console.log("User type:", userType);
          localStorage.setItem("userType", userType);

          if (userType == "student") { window.location.pathname = "/intership-master/main.html"; }
          else if (userType == "coordinator") { window.location.pathname = "/intership-master/Coordinator.html"; }
          else { window.location.pathname = "/intership-master/Career-Center.html"; }

        } else {
          console.log("No matching documents."); // if userType was not found
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error); // if fetching documents failed
      });
      
    })
    .catch((err) => {
      console.log(err.message); // front-end to display incorrect login goes here
    });
});
} catch (error) { console.log(error) } // if the page has no login

