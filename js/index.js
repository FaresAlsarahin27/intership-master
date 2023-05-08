// import firebase libraries
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

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
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

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
