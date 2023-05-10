// import firebase libraries
import firebaseConfig from "./firebaseConfig";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// init services
const db = getFirestore();
const auth = getAuth();

// collection refs
const usersCollection = collection(db, "users");

// remove index.html from address bar
if(window.location.pathname === '/intership-master/index.html')
{ history.replaceState(null, null, '/intership-master/') };

// logging in
if (window.location.pathname === '/intership-master/') { // don't run this code on other pages

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

          const userInformation = { // collect all info (this variable is temp)
            email: email,
            userType: userType,
            firstname: firstname,
            surname: surname
          };

          localStorage.setItem("info", JSON.stringify(userInformation)); // save it in local storage

          if (userType == "student") { window.location.replace("/intership-master/main.html"); }
          else if (userType == "coordinator") { window.location.replace("/intership-master/Coordinator.html"); }
          else if (userType == "admin") { window.location.replace("/intership-master/admin.html"); }
          else { window.location.replace("/intership-master/Career-Center.html"); }

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

// store user information for usage
const userInfo = JSON.parse(localStorage.getItem("info"))

// functions for the pages that have the user navbar
if (window.location.pathname !== '/intership-master/incoming-message.html'
&& window.location.pathname !== '/intership-master/'
&& window.location.pathname !== '/intership-master/stats.html'
&& window.location.pathname !== '/intership-master/admin.html') {

// sign out
  const logoutBtn = document.getElementById("pfp-span");
  logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    localStorage.clear(); // clear user info from local storage
    window.location.replace('/intership-master/');
    console.log("User signed out");
  }).catch((error) => {
    console.error(error);
  });
});

// change name in navbar to user's name
document.getElementById("user-name").textContent = userInfo.firstname + " " + userInfo.surname;
}

try {
// prevent access to login page while user is still logged in (redirect to user type's main page)
if(userInfo.userType === "student" && window.location.pathname === '/intership-master/'){
  window.location.replace('/intership-master/main.html');
}
else if (userInfo.userType === "coordinator" && window.location.pathname === '/intership-master/'){
  window.location.replace('/intership-master/Coordinator.html');
}
else if (userInfo.userType === "career" && window.location.pathname === '/intership-master/'){
  window.location.replace('/intership-master/Career-Center.html');
}

// deny access to pages based on userType (admin allowed everywhere for now)
if(userInfo.userType === "student" &&
  (window.location.pathname === "/intership-master/Career-Center.html"
|| window.location.pathname === "/intership-master/Coordinator.html"
|| window.location.pathname === "/intership-master/admin.html")) {

  window.location.replace('/intership-master/main.html');
}
else if(userInfo.userType === "career" && window.location.pathname !== "/intership-master/Career-Center.html"){
  window.location.replace('/intership-master/Career-Center.html');
}
else if(userInfo.userType === "coordinator" &&
  (window.location.pathname !== "/intership-master/Coordinator.html"
&& window.location.pathname !== "/intership-master/new-msg.html"
&& window.location.pathname !== "/intership-master/see-msg.html"
&& window.location.pathname !== "/intership-master/incoming-message.html")) {

  window.location.replace('/intership-master/Coordinator.html');
}

} catch(error) { console.log("userType is null - not logged in yet") }



