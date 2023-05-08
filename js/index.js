// import firebase libraries
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Overlay

TweenMax.to(".overlay", 2, {
  delay: 1,
  top: "-100%",
  ease: Expo.easeInOut,
});

TweenMax.to(".overlay span", 2, {
  delay: 0.3,
  opacity: 0,
  y: -60,
  ease: Expo.easeInOut,
});

TweenMax.to(".overlay h1", 2, {
  opacity: 0,
  y: -60,
  ease: Expo.easeInOut,
});

/*****/
TweenMax.from(".login", 1, {
  delay: 3,
  opacity: 0,
  y: -100,
  ease: Expo.easeInOut,
});
TweenMax.from(".login-form", 1, {
  delay: 3,
  opacity: 0,
  y: 200,
  ease: Expo.easeInOut,
});

// setup connection to firebase
const firebaseConfig = {
  apiKey: "AIzaSyCvix8gWSjyc5qZvdwAiz4fNlkgUclPy1s",
  authDomain: "internship-automation-process.firebaseapp.com",
  projectId: "internship-automation-process",
  storageBucket: "internship-automation-process.appspot.com",
  messagingSenderId: "884525502818",
  appId: "1:884525502818:web:199d2dbb5c1fd87c101c3b"
}
// init firebase
initializeApp(firebaseConfig);
// init services
const db = getFirestore();
// collection refs
const colRef = collection(db, 'users');
// fetch from database
getDocs(colRef)
  .then((snapshot) => {
    let names = []
    snapshot.docs.forEach((doc) => {
      names.push({ ...doc.data(), id: doc.id })
    })
    console.log(names)
  })
  .catch(err => {
    console.log(err.message)
  })

console.log('hello?');

