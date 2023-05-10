/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/firebaseConfig.js":
/*!******************************!*\
  !*** ./js/firebaseConfig.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/esm/index.esm.js\");\n\r\n\r\n// setup connection to firebase\r\nconst firebaseConfig = {\r\n  apiKey: \"AIzaSyCvix8gWSjyc5qZvdwAiz4fNlkgUclPy1s\",\r\n  authDomain: \"internship-automation-process.firebaseapp.com\",\r\n  projectId: \"internship-automation-process\",\r\n  storageBucket: \"internship-automation-process.appspot.com\",\r\n  messagingSenderId: \"884525502818\",\r\n  appId: \"1:884525502818:web:199d2dbb5c1fd87c101c3b\",\r\n};\r\n\r\n// init firebase\r\n(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\r\n\n\n//# sourceURL=webpack://ipa/./js/firebaseConfig.js?");

/***/ }),

/***/ "./js/services.js":
/*!************************!*\
  !*** ./js/services.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _firebaseConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebaseConfig */ \"./js/firebaseConfig.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n// import firebase libraries\r\n\r\n\r\n\r\n\r\n\r\n// init services\r\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)();\r\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();\r\n\r\n// collection refs\r\nconst usersCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, \"users\");\r\n\r\n// logging in\r\nif (window.location.pathname === '/intership-master/index.html' // don't run this code if not on index.html\r\n|| window.location.pathname === '/intership-master/') { // for github\r\n\r\nconst loginForm = document.querySelector(\".login-form\");\r\nloginForm.addEventListener(\"submit\", (e) => {\r\n  e.preventDefault();\r\n\r\n  const email = loginForm.email.value;\r\n  const password = loginForm.password.value;\r\n\r\n  (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(auth, email, password)\r\n    .then((cred) => {\r\n\r\n      const qEmail = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)(usersCollection, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)(\"email\", \"==\", email));\r\n      (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(qEmail)\r\n      .then((querySnapshot) => {\r\n        if (querySnapshot.size > 0) { // fetch all the info we'll need later\r\n          const userType = querySnapshot.docs[0].data().userType;\r\n          const firstname = querySnapshot.docs[0].data().name;\r\n          const surname = querySnapshot.docs[0].data().surname;\r\n          const email = querySnapshot.docs[0].data().email;\r\n\r\n          const userInfo = { // collect all info (this variable is temp)\r\n            email: email,\r\n            userType: userType,\r\n            firstname: firstname,\r\n            surname: surname\r\n          };\r\n\r\n          localStorage.setItem(\"userInfo\", JSON.stringify(userInfo)); // save it in local storage\r\n\r\n          if (userType == \"student\") { window.location.pathname = \"/intership-master/main.html\"; }\r\n          else if (userType == \"coordinator\") { window.location.pathname = \"/intership-master/Coordinator.html\"; }\r\n          else { window.location.pathname = \"/intership-master/Career-Center.html\"; }\r\n\r\n        } else {\r\n          console.log(\"Some fetch required info were not found\"); // if info was not found\r\n        }\r\n      })\r\n      .catch((error) => {\r\n        console.log(\"Error getting documents: \", error); // if fetching documents failed\r\n      });\r\n      \r\n    })\r\n    .catch((err) => {\r\n      console.log(err.message); // front-end to display incorrect login goes here\r\n    });\r\n})\r\n} // close the check if statement\r\n\r\n// functions for the pages that have the user navbar\r\nif (window.location.pathname !== '/intership-master/incoming-message.html'\r\n&& window.location.pathname !== '/intership-master/index.html'\r\n&& window.location.pathname !== '/intership-master/' // for github\r\n&& window.location.pathname !== '/intership-master/stats.html') {\r\n\r\n// sign out\r\n  const logoutBtn = document.getElementById(\"pfp-span\");\r\n  logoutBtn.addEventListener(\"click\", () => {\r\n  auth.signOut().then(() => {\r\n    window.location.pathname = \"/intership-master/index.html\";\r\n    console.log(\"User signed out\");\r\n  }).catch((error) => {\r\n    console.error(error);\r\n  });\r\n});\r\n\r\n// change name in navbar to user's name\r\n  const userInfo = JSON.parse(localStorage.getItem(\"userInfo\"));\r\n  document.getElementById(\"user-name\").textContent = userInfo.firstname + \" \" + userInfo.surname;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://ipa/./js/services.js?");

/***/ }),

/***/ "./node_modules/firebase/app/dist/esm/index.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/firebase/app/dist/esm/index.esm.js ***!
  \*********************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\Users\\\\satur\\\\Desktop\\\\IPA\\\\intership-master\\\\node_modules\\\\firebase\\\\app\\\\dist\\\\esm\\\\index.esm.js'\");\n\n//# sourceURL=webpack://ipa/./node_modules/firebase/app/dist/esm/index.esm.js?");

/***/ }),

/***/ "./node_modules/firebase/auth/dist/esm/index.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/firebase/auth/dist/esm/index.esm.js ***!
  \**********************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\Users\\\\satur\\\\Desktop\\\\IPA\\\\intership-master\\\\node_modules\\\\firebase\\\\auth\\\\dist\\\\esm\\\\index.esm.js'\");\n\n//# sourceURL=webpack://ipa/./node_modules/firebase/auth/dist/esm/index.esm.js?");

/***/ }),

/***/ "./node_modules/firebase/firestore/dist/esm/index.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/firebase/firestore/dist/esm/index.esm.js ***!
  \***************************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\Users\\\\satur\\\\Desktop\\\\IPA\\\\intership-master\\\\node_modules\\\\firebase\\\\firestore\\\\dist\\\\esm\\\\index.esm.js'\");\n\n//# sourceURL=webpack://ipa/./node_modules/firebase/firestore/dist/esm/index.esm.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/services.js");
/******/ 	
/******/ })()
;