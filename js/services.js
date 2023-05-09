// import firebase libraries
import firebaseConfig from "./firebaseConfig";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// init services
const db = getFirestore();
const auth = getAuth();

// collection refs
const usersCollection = collection(db, "users");

// logging in
if (window.location.pathname === '/intership-master/index.html' // don't run this code if not on index.html
|| window.location.pathname === '/intership-master/') { 

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
        if (querySnapshot.size > 0) { // fetch all the info we'll need later
          const userType = querySnapshot.docs[0].data().userType;
          const firstname = querySnapshot.docs[0].data().name;
          const surname = querySnapshot.docs[0].data().surname;
          const email = querySnapshot.docs[0].data().email;

          const userInfo = { // collect all info (this variable is temp)
            email: email,
            userType: userType,
            firstname: firstname,
            surname: surname
          };

          localStorage.setItem("userInfo", JSON.stringify(userInfo)); // save it in local storage

          if (userType == "student") { window.location.pathname = "/intership-master/main.html"; }
          else if (userType == "coordinator") { window.location.pathname = "/intership-master/Coordinator.html"; }
          else { window.location.pathname = "/intership-master/Career-Center.html"; }

        } else {
          console.log("Some fetch required info were not found"); // if info was not found
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error); // if fetching documents failed
      });
      
    })
    .catch((err) => {
      console.log(err.message); // front-end to display incorrect login goes here
    });
})
} // close the check if statement

// functions for the pages that have the user navbar
if (window.location.pathname !== '/intership-master/incoming-message.html'
&& window.location.pathname !== '/intership-master/index.html'
&& window.location.pathname !== '/intership-master/' // for github
&& window.location.pathname !== '/intership-master/stats.html') {

// sign out
  const logoutBtn = document.getElementById("pfp-span");
  logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.pathname = "/intership-master/index.html";
    console.log("User signed out");
  }).catch((error) => {
    console.error(error);
  });
});

// change name in navbar to user's name
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  document.getElementById("user-name").textContent = userInfo.firstname + " " + userInfo.surname;
}


